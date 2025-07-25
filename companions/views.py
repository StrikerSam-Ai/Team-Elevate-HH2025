from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods, require_POST
from django.middleware.csrf import get_token
from django.views.generic import TemplateView
from .models import CustomUser, Community, CommunityMembership
import logging
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import requests
import os
from .auth_utils import RateLimit, TwoFactorAuth, PasswordValidator, SessionManager
from django.utils import timezone

logger = logging.getLogger(__name__)

# --- Authentication Views ---

def login_view(request):
    """Display the login page."""
    if request.user.is_authenticated:
        return redirect('companions:home')
    return render(request, 'html/login.html')

@ensure_csrf_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    """
    Returns CSRF token for the frontend to use in subsequent requests.
    This endpoint ensures the CSRF cookie is set properly.
    """
    token = get_token(request)
    response = JsonResponse({'csrfToken': token})
    response['X-CSRFToken'] = token
    return response

@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def login_user(request):
    """Handle login API request."""
    try:
        # Add debug logging to see request details
        logger.info(f"Login attempt - Content-Type: {request.content_type}")
        logger.info(f"Login attempt - Headers: {request.headers}")
        
        if request.content_type == 'application/json':
            data = json.loads(request.body)
            logger.info(f"Login attempt - JSON data: {data.keys()}")
        else:
            data = request.POST.dict()
            logger.info(f"Login attempt - POST data: {data.keys()}")

        email = data.get('email')
        password = data.get('password')
        
        logger.info(f"Login attempt for email: {email} (password provided: {bool(password)})")

        if not email or not password:
            logger.error("Login failed - Missing email or password")
            return JsonResponse({
                'success': False,
                'error': 'Email and password are required'
            }, status=400)

        # Check rate limiting
        rate_limiter = RateLimit('login_attempts', max_attempts=5, window_seconds=300)  # 5 attempts per 5 minutes
        if rate_limiter.is_rate_limited(email):
            return JsonResponse({
                'success': False,
                'error': 'Too many login attempts. Please try again later.'
            }, status=429)

        # Use authenticate with email parameter
        user = authenticate(request, email=email, password=password)
        logger.info(f"Authentication result: {'success' if user else 'failed'}")
        
        if user is not None:
            if user.is_active:
                # Check if account is locked
                if user.is_account_locked():
                    return JsonResponse({
                        'success': False,
                        'error': 'Account is temporarily locked. Please try again later.'
                    }, status=401)

                # Reset failed login attempts on successful login
                user.reset_failed_login()

                # Check if 2FA is enabled
                if user.two_factor_enabled:
                    # If 2FA token is provided, verify it
                    if 'two_factor_token' in data:
                        two_factor = TwoFactorAuth(user)
                        if not two_factor.verify_token(data['two_factor_token']):
                            return JsonResponse({
                                'success': False,
                                'error': 'Invalid 2FA token'
                            }, status=401)
                    else:
                        # Return 2FA required response
                        return JsonResponse({
                            'success': False,
                            'requires_2fa': True,
                            'message': '2FA token required'
                        }, status=200)

                login(request, user)
                
                # Create a simple token (use JWT in production)
                from django.contrib.auth.tokens import default_token_generator
                token = default_token_generator.make_token(user)
                
                logger.info(f"Login successful for user: {email}")
                
                # Get CSRF token and include it in the response
                csrf_token = get_token(request)
                response = JsonResponse({
                    'success': True,
                    'token': token,
                    'user': {
                        'email': user.email,
                        'name': user.name,
                        'id': user.id
                    }
                })
                response['X-CSRFToken'] = csrf_token
                return response
            else:
                logger.error(f"Login failed - Account disabled for: {email}")
                return JsonResponse({
                    'success': False,
                    'error': 'Account is disabled'
                }, status=401)
        else:
            # Increment failed login attempts
            try:
                user = CustomUser.objects.get(email=email)
                user.increment_failed_login()
            except CustomUser.DoesNotExist:
                pass
            
            logger.error(f"Login failed - Invalid credentials for: {email}")
            return JsonResponse({
                'success': False,
                'error': 'Invalid email or password'
            }, status=401)
    except json.JSONDecodeError:
        logger.error("Login failed - Invalid JSON format")
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON format'
        }, status=400)
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'An error occurred during login'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def refresh_token(request):
    """Handle token refresh request."""
    try:
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST.dict()
            
        token = data.get('token')
        if not token:
            return JsonResponse({
                'success': False,
                'error': 'Token is required'
            }, status=400)
            
        # In a production environment, you would validate the token here
        # and generate a new one. For now, we'll just return the same token
        return JsonResponse({
            'success': True,
            'token': token
        })
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid request format'
        }, status=400)
    except Exception as e:
        logger.error(f"Token refresh error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'An error occurred during token refresh'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    """Handle user registration."""
    try:
        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST.dict()
            
        # Validate required fields
        required_fields = ['email', 'password', 'name']
        for field in required_fields:
            if not data.get(field):
                return JsonResponse({
                    'success': False,
                    'error': f'{field} is required'
                }, status=400)
            
        if CustomUser.objects.filter(email=data.get('email')).exists():
            return JsonResponse({
                'success': False,
                'error': 'Email already registered'
            }, status=400)
        
        # Handle birth_date properly - this prevents date format errors
        birth_date = None
        if data.get('birth_date'):
            try:
                from datetime import datetime
                # Try to parse the date string into a Python date object
                # This assumes date format is YYYY-MM-DD but adjust as needed
                birth_date = datetime.strptime(data.get('birth_date'), '%Y-%m-%d').date()
            except ValueError:
                # If date parsing fails, return an error response
                return JsonResponse({
                    'success': False,
                    'error': 'Invalid birth_date format. Please use YYYY-MM-DD format.'
                }, status=400)
            
        user = CustomUser.objects.create_user(
            email=data.get('email'),
            password=data.get('password'),
            name=data.get('name'),
            birth_date=birth_date,  # Now this is either None or a proper date object
            phone=data.get('phone', ''),
            city=data.get('city', '')
        )
        
        login(request, user)
        
        # Create a simple token (use JWT in production)
        from django.contrib.auth.tokens import default_token_generator
        token = default_token_generator.make_token(user)
        
        return JsonResponse({
            'success': True,
            'token': token,
            'user': {
                'email': user.email,
                'name': user.name,
                'id': user.id
            }
        })
            
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid request format'
        }, status=400)
    except Exception as e:
        # Add more detailed logging to help diagnose issues
        import traceback
        logger.error(f"Registration error: {str(e)}")
        logger.error(traceback.format_exc())
        return JsonResponse({
            'success': False,
            'error': 'An unexpected error occurred during registration.'
        }, status=500)

@ensure_csrf_cookie
@require_http_methods(["POST"])
@login_required
def logout_view(request):
    """Log out the user."""
    logout(request)
    return JsonResponse({
        'success': True,
        'redirect': '/login/'
    })

@login_required
def home_view(request):
    """Display the home page."""
    # For unauthenticated users, redirect to login
    if not request.user.is_authenticated:
        return redirect('login')
    
    # For authenticated users, redirect to React app
    return redirect('react-app')

# --- Profile Views ---


@login_required
def profile_view(request):
    """Render the user profile page."""
    return render(request, 'html/profile.html')

@login_required
@require_POST
def profile_update_view(request):
    """Handle the profile update form submission or JSON API request."""
    user = request.user
    
    if request.method == 'POST':
        try:
            # Handle JSON API requests
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                
                # Only update fields that were provided in the request
                if 'name' in data:
                    user.name = data.get('name')
                if 'phone' in data:
                    user.phone = data.get('phone')
                if 'city' in data:
                    user.city = data.get('city')
                if 'birth_date' in data and data.get('birth_date'):
                    try:
                        from datetime import datetime
                        user.birth_date = datetime.strptime(data.get('birth_date'), '%Y-%m-%d').date()
                    except ValueError:
                        return JsonResponse({
                            'success': False,
                            'error': 'Invalid birth_date format. Please use YYYY-MM-DD format.'
                        }, status=400)
                
                # Emergency contact info
                if 'emergency_contact_name' in data:
                    user.emergency_contact_name = data.get('emergency_contact_name')
                if 'emergency_contact_phone' in data:
                    user.emergency_contact_phone = data.get('emergency_contact_phone')
                if 'emergency_contact_relationship' in data:
                    user.emergency_contact_relationship = data.get('emergency_contact_relationship')
                
                # Medical info
                if 'medical_conditions' in data:
                    user.medical_conditions = data.get('medical_conditions')
                if 'allergies' in data:
                    user.allergies = data.get('allergies')
                if 'blood_group' in data:
                    user.blood_group = data.get('blood_group')
                if 'preferred_hospital' in data:
                    user.preferred_hospital = data.get('preferred_hospital')
                if 'insurance_info' in data:
                    user.insurance_info = data.get('insurance_info')
                
                # Save the changes
                user.save()
                
                return JsonResponse({
                    'success': True,
                    'message': 'Profile updated successfully'
                })
                
            # Handle form submissions
            else:
                # Update basic info
                user.name = request.POST.get('name', user.name)
                user.phone = request.POST.get('phone', user.phone)
                user.city = request.POST.get('city', user.city)
                
                # Handle birth date if provided
                birth_date = request.POST.get('birth_date')
                if birth_date:
                    try:
                        from datetime import datetime
                        user.birth_date = datetime.strptime(birth_date, '%Y-%m-%d').date()
                    except ValueError:
                        # If date parsing fails, don't update this field
                        pass
                
                # Update emergency contact info
                user.emergency_contact_name = request.POST.get('emergency_contact_name', user.emergency_contact_name)
                user.emergency_contact_phone = request.POST.get('emergency_contact_phone', user.emergency_contact_phone)
                user.emergency_contact_relationship = request.POST.get('emergency_contact_relationship', user.emergency_contact_relationship)
                
                # Update medical info
                user.medical_conditions = request.POST.get('medical_conditions', user.medical_conditions)
                user.allergies = request.POST.get('allergies', user.allergies)
                user.blood_group = request.POST.get('blood_group', user.blood_group)
                user.preferred_hospital = request.POST.get('preferred_hospital', user.preferred_hospital)
                user.insurance_info = request.POST.get('insurance_info', user.insurance_info)
                
                # Save the changes
                user.save()
                
                return redirect('companions:profile')
                
        except json.JSONDecodeError:
            return JsonResponse({
                'success': False,
                'error': 'Invalid JSON format'
            }, status=400)
        except Exception as e:
            logger.error(f"Profile update error: {str(e)}")
            if request.content_type == 'application/json':
                return JsonResponse({
                    'success': False,
                    'error': 'An error occurred while updating your profile'
                }, status=500)
            # For form submissions, redirect with an error
            return redirect('companions:profile')
    
    # For GET requests, just redirect to the profile page
    return redirect('companions:profile')

@login_required
def profile_api(request):
    """API endpoint for profile data."""
    user = request.user
    # Return complete profile data as JSON
    data = {
        'id': user.id,
        'email': user.email,
        'name': user.name,
        'birth_date': user.birth_date.isoformat() if user.birth_date else None,
        'phone': user.phone,
        'city': user.city,
        'emergency_contact_name': user.emergency_contact_name,
        'emergency_contact_phone': user.emergency_contact_phone,
        'emergency_contact_relationship': user.emergency_contact_relationship,
        'medical_conditions': user.medical_conditions,
        'allergies': user.allergies,
        'blood_group': user.blood_group,
        'preferred_hospital': user.preferred_hospital,
        'insurance_info': user.insurance_info
    }
    return JsonResponse(data)

@login_required
def profile_preferences(request):
    """API endpoint for user preferences."""
    if request.method == 'GET':
        # Return user preferences
        preferences = {
            'theme': 'light',  # placeholder data
            'notifications_enabled': True,  # placeholder data
            'language': 'en',  # placeholder data
        }
        return JsonResponse(preferences)
    elif request.method == 'POST':
        # Update user preferences
        try:
            data = json.loads(request.body)
            # Here you would save the preferences to the user's profile
            return JsonResponse({'success': True})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def profile_notifications(request):
    """API endpoint for user notifications."""
    # Placeholder data for notifications
    notifications = [
        {
            'id': 1,
            'message': 'Welcome to the platform!',
            'type': 'welcome',
            'read': False,
            'created_at': '2025-04-25T10:00:00Z'
        },
        {
            'id': 2,
            'message': 'New event in your community',
            'type': 'event',
            'read': True,
            'created_at': '2025-04-24T15:30:00Z'
        }
    ]
    return JsonResponse({'notifications': notifications})

@login_required
def profile_activity(request):
    """API endpoint for user activity."""
    # Placeholder data for user activity
    activities = [
        {
            'id': 1,
            'type': 'join_community',
            'description': 'You joined the Tech Community',
            'created_at': '2025-04-20T14:30:00Z'
        },
        {
            'id': 2,
            'type': 'event_rsvp',
            'description': 'You RSVP\'d to Hackathon 2025',
            'created_at': '2025-04-22T09:15:00Z'
        }
    ]
    return JsonResponse({'activities': activities})

# --- Other Views ---


@ensure_csrf_cookie
def react_app_view(request):
    """Serve the React application."""
    return render(request, 'html/react_app.html')

def community_view(request):
    """Display the community page."""
    return HttpResponse("This is the community page.")

@login_required
def dashboard_view(request):
    """Render the dashboard page."""
    return render(request, 'html/dashboard.html')

def settings_view(request):
    """Render the settings page."""
    return HttpResponse("This is the settings page.")

@require_http_methods(["GET"])
def check_auth(request):
    """Return JSON indicating whether the user is authenticated."""
    if request.user.is_authenticated:
        return JsonResponse({
            'authenticated': True,
            'email': request.user.email,
            'name': request.user.name,  # Using name field instead of first_name or username
            'id': request.user.id
        })
    return JsonResponse({'authenticated': False})

@require_http_methods(["GET"])
def test_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "This is a protected endpoint"})
    else:
        return JsonResponse({"error": "Authentication required"}, status=401)

@login_required
def profile_view(request):
    return render(request, 'html/profile.html')


@login_required
def community_list(request):
    if request.method == 'GET':
        communities = Community.objects.all()
        data = [{
            'id': community.id,
            'name': community.name,
            'description': community.description,
            'member_count': community.members.count(),
            'created_by': community.created_by.name,
            'created_at': community.created_at.isoformat()
        } for community in communities]
        return JsonResponse({'communities': data})
    return JsonResponse({"error": "Invalid request method"}, status=400)

@login_required
def join_community(request, community_id):
    if request.method == 'POST':
        try:
            community = Community.objects.get(id=community_id)
            membership, created = CommunityMembership.objects.get_or_create(user=request.user, community=community)
            if created:
                return JsonResponse({"message": "Joined community successfully"})
            else:
                return JsonResponse({"message": "Already a member of this community"})
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Community not found"}, status=404)
    return JsonResponse({"error": "Invalid request method"}, status=400)

@login_required
def create_community(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        description = request.POST.get('description')
        if not name or not description:
            return JsonResponse({"error": "Name and description are required"}, status=400)
        community = Community.objects.create(name=name, description=description, created_by=request.user)
        CommunityMembership.objects.create(user=request.user, community=community)
        return redirect('community_list')
    return render(request, 'html/create_community.html')

@login_required
def community_detail(request, community_id):
    try:
        community = Community.objects.get(id=community_id)
        if request.method == 'GET':
            data = {
                'id': community.id,
                'name': community.name,
                'description': community.description,
                'member_count': community.members.count(),
                'created_by': community.created_by.name,
                'created_at': community.created_at.isoformat(),
                'members': [{
                    'id': member.id,
                    'name': member.name,
                    'email': member.email
                } for member in community.members.all()]
            }
            return JsonResponse(data)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Community not found"}, status=404)

@login_required
def community_members(request, community_id):
    """API endpoint for community members."""
    try:
        community = Community.objects.get(id=community_id)
        members = [{
            'id': member.id,
            'name': member.name,
            'email': member.email
        } for member in community.members.all()]
        return JsonResponse({'members': members})
    except ObjectDoesNotExist:
        return JsonResponse({'error': 'Community not found'}, status=404)

@login_required
def community_posts(request):
    """API endpoint for community posts."""
    # Placeholder data for community posts
    posts = [
        {
            'id': 1,
            'title': 'Welcome to our community!',
            'content': 'This is a placeholder post.',
            'author': 'Admin',
            'created_at': '2025-04-20T10:00:00Z',
            'community_id': 1
        },
        {
            'id': 2,
            'title': 'Upcoming events',
            'content': 'Check out our calendar for upcoming events.',
            'author': 'Moderator',
            'created_at': '2025-04-22T14:30:00Z',
            'community_id': 1
        }
    ]
    return JsonResponse({'posts': posts})

@csrf_exempt
def TextGenerationView(request):
    """API endpoint for text generation using Groq LLM."""
    if request.method == "POST":
        try:
            # Parse JSON data
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON"}, status=400)
                
            prompt = data.get("prompt", "")
            language = data.get("language", "english")

            # Validate input
            if not prompt:
                return JsonResponse({"error": "Prompt is required"}, status=400)

            # Check for API key
            api_key = os.getenv('GROQ_API_KEY')
            if not api_key or api_key == 'your-api-key-here':
                # Return a graceful fallback response
                fallback_response = (
                    f"I'm sorry, but the AI service is not configured with a valid API key. "
                    f"This is a development mode response. In production, this would use the Groq API to "
                    f"generate a response to your prompt: '{prompt}'. "
                    f"Please add a valid GROQ_API_KEY to your .env file to enable this feature."
                )
                return JsonResponse({"response": fallback_response})

            # Call Groq API
            headers = {
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
            }
            
            payload = {
                "model": "llama3-70b-8192",
                "messages": [
                    {"role": "system", "content": f"You are a helpful assistant who replies in {language}."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7,
                "max_tokens": 800
            }

            try:
                response = requests.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers=headers,
                    json=payload,
                    timeout=30  # Add timeout to avoid hanging requests
                )

                if response.status_code == 200:
                    content = response.json()["choices"][0]["message"]["content"]
                    return JsonResponse({"response": content})
                else:
                    # More detailed error information
                    error_detail = f"Status: {response.status_code}"
                    try:
                        error_detail += f", Message: {response.json().get('error', {}).get('message', 'Unknown error')}"
                    except:
                        error_detail += ", Could not parse error response"
                        
                    return JsonResponse(
                        {"error": f"API error: {error_detail}"},
                        status=response.status_code
                    )
            except requests.exceptions.Timeout:
                return JsonResponse({"error": "Request to API timed out"}, status=504)
            except requests.exceptions.ConnectionError:
                return JsonResponse({"error": "Could not connect to API service"}, status=503)

        except Exception as e:
            logger.error(f"Text generation error: {str(e)}")
            return JsonResponse(
                {"error": f"Server error: {str(e)}"},
                status=500
            )
    return JsonResponse({"error": "Method not allowed"}, status=405)

# --- Chat Views ---

@login_required
def chat_room_list(request):
    """Show list of available chat rooms."""
    # This is a placeholder - in a real app, you would fetch rooms from the database
    rooms = [
        {'name': 'general', 'description': 'General discussion'},
        {'name': 'health', 'description': 'Health and wellness'},
        {'name': 'activities', 'description': 'Social activities and events'},
        {'name': 'support', 'description': 'Emotional support'},
    ]
    return render(request, 'html/chat_rooms.html', {'rooms': rooms})

@login_required
def chat_room(request, room_name):
    """Show chat room."""
    return render(request, 'html/chat.html', {'room_name': room_name})

# --- Error Views ---

def handler404(request, exception):
    """Handle 404 errors."""
    return render(request, 'html/error.html', {
        'error_code': '404',
        'error_title': 'Page Not Found',
        'error_message': 'The page you are looking for does not exist or has been moved.',
        'show_login': not request.user.is_authenticated
    }, status=404)

def handler500(request):
    """Handle 500 errors."""
    return render(request, 'html/error.html', {
        'error_code': '500',
        'error_title': 'Server Error',
        'error_message': 'Something went wrong on our end. Please try again later.',
        'show_login': False
    }, status=500)

def handler403(request, exception):
    """Handle 403 errors."""
    return render(request, 'html/error.html', {
        'error_code': '403',
        'error_title': 'Access Denied',
        'error_message': 'You don\'t have permission to access this page.',
        'show_login': not request.user.is_authenticated
    }, status=403)

def handler400(request, exception):
    """Handle 400 errors."""
    return render(request, 'html/error.html', {
        'error_code': '400',
        'error_title': 'Bad Request',
        'error_message': 'The request could not be processed.',
        'show_login': False
    }, status=400)

# Django class-based view to render the React application
class ReactAppView(TemplateView):
    """A view to render the React application."""
    template_name = "html/react_app.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Add any additional context variables needed by the React app here
        return context

# --- Event Views ---

@login_required
def events_list(request):
    """API endpoint for events list."""
    # Placeholder data for events
    events = [
        {
            'id': 1,
            'title': 'Community Meetup',
            'description': 'Monthly community gathering',
            'location': 'Community Center',
            'start_date': '2025-05-15T14:00:00Z',
            'end_date': '2025-05-15T16:00:00Z',
            'created_by': 'Admin',
            'attendees_count': 12
        },
        {
            'id': 2,
            'title': 'Wellness Workshop',
            'description': 'Learn about healthy living practices',
            'location': 'Health Center',
            'start_date': '2025-05-20T10:00:00Z',
            'end_date': '2025-05-20T12:00:00Z',
            'created_by': 'Health Coach',
            'attendees_count': 8
        }
    ]
    return JsonResponse({'events': events})

@login_required
def create_event(request):
    """API endpoint for creating a new event."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # In a real implementation, this would save to the database
            # For now, we'll just return success
            return JsonResponse({
                'success': True, 
                'message': 'Event created successfully',
                'event_id': 3  # Mock ID for the created event
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def event_detail(request, event_id):
    """API endpoint for event details."""
    # Placeholder data for the specific event
    events = {
        1: {
            'id': 1,
            'title': 'Community Meetup',
            'description': 'Monthly community gathering',
            'location': 'Community Center',
            'start_date': '2025-05-15T14:00:00Z',
            'end_date': '2025-05-15T16:00:00Z',
            'created_by': 'Admin',
            'attendees_count': 12,
            'attendees': [
                {'id': 1, 'name': 'John Doe'},
                {'id': 2, 'name': 'Jane Smith'}
            ]
        },
        2: {
            'id': 2,
            'title': 'Wellness Workshop',
            'description': 'Learn about healthy living practices',
            'location': 'Health Center',
            'start_date': '2025-05-20T10:00:00Z',
            'end_date': '2025-05-20T12:00:00Z',
            'created_by': 'Health Coach',
            'attendees_count': 8,
            'attendees': [
                {'id': 3, 'name': 'Bob Johnson'},
                {'id': 4, 'name': 'Alice Brown'}
            ]
        }
    }
    
    if int(event_id) in events:
        return JsonResponse(events[int(event_id)])
    return JsonResponse({'error': 'Event not found'}, status=404)

@login_required
def join_event(request, event_id):
    """API endpoint for joining an event."""
    if request.method == 'POST':
        # In a real app, this would add the user to the attendees list
        return JsonResponse({
            'success': True, 
            'message': f'Successfully joined event {event_id}'
        })
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@login_required
def upcoming_events(request):
    """API endpoint for upcoming events."""
    # Placeholder data for upcoming events
    events = [
        {
            'id': 1,
            'title': 'Community Meetup',
            'description': 'Monthly community gathering',
            'location': 'Community Center',
            'start_date': '2025-05-15T14:00:00Z',
            'end_date': '2025-05-15T16:00:00Z'
        },
        {
            'id': 2,
            'title': 'Wellness Workshop',
            'description': 'Learn about healthy living practices',
            'location': 'Health Center',
            'start_date': '2025-05-20T10:00:00Z',
            'end_date': '2025-05-20T12:00:00Z'
        }
    ]
    return JsonResponse({'events': events})

@login_required
def past_events(request):
    """API endpoint for past events."""
    # Placeholder data for past events
    events = [
        {
            'id': 3,
            'title': 'Tech Talk',
            'description': 'Discussion on new technologies',
            'location': 'Tech Hub',
            'start_date': '2025-04-10T15:00:00Z',
            'end_date': '2025-04-10T17:00:00Z'
        },
        {
            'id': 4,
            'title': 'Book Club Meeting',
            'description': 'Discussion of monthly book',
            'location': 'Community Library',
            'start_date': '2025-04-25T18:00:00Z',
            'end_date': '2025-04-25T19:30:00Z'
        }
    ]
    return JsonResponse({'events': events})

# --- Journal Views ---

@login_required
def journal_list(request):
    """API endpoint for journal entries."""
    # Placeholder data for journal entries
    entries = [
        {
            'id': 1,
            'title': 'My First Day',
            'content': 'This is my first journal entry.',
            'created_at': '2025-05-01T10:00:00Z',
            'updated_at': '2025-05-01T10:00:00Z'
        },
        {
            'id': 2,
            'title': 'Progress Update',
            'content': 'Making good progress with my goals.',
            'created_at': '2025-05-03T14:30:00Z',
            'updated_at': '2025-05-03T15:15:00Z'
        }
    ]
    return JsonResponse({'entries': entries})

@login_required
def create_journal(request):
    """API endpoint for creating a journal entry."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # In a real implementation, this would save to the database
            return JsonResponse({
                'success': True, 
                'message': 'Journal entry created successfully',
                'journal_id': 3  # Mock ID for the created entry
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def update_journal(request, journal_id):
    """API endpoint for updating a journal entry."""
    if request.method == 'PUT' or request.method == 'POST':
        try:
            data = json.loads(request.body)
            # In a real implementation, this would update the database
            return JsonResponse({
                'success': True, 
                'message': f'Journal entry {journal_id} updated successfully'
            })
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def delete_journal(request, journal_id):
    """API endpoint for deleting a journal entry."""
    if request.method == 'DELETE' or request.method == 'POST':
        # In a real implementation, this would delete from the database
        return JsonResponse({
            'success': True, 
            'message': f'Journal entry {journal_id} deleted successfully'
        })
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def verify_journal(request, hash):
    """API endpoint for verifying a journal hash."""
    # This would typically validate some secure hash or token for the journal
    # For now, just return success
    return JsonResponse({
        'success': True, 
        'message': 'Journal entry verified successfully'
    })

def summarize_text(request):
    """API endpoint for summarizing text."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text', '')
            
            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)
                
            # In a real implementation, this would use an AI model or service
            # For now, return a placeholder summary
            summary = f"This is a summary of the provided text (length: {len(text)} characters)."
            
            return JsonResponse({'summary': summary})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)

@api_view(['POST'])
@permission_classes([AllowAny])
@ensure_csrf_cookie
def setup_2fa(request):
    """Handle 2FA setup request."""
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'error': 'Authentication required'
            }, status=401)

        two_factor = TwoFactorAuth(request.user)
        qr_code = two_factor.get_qr_code()
        backup_codes = request.user.generate_backup_codes()

        return JsonResponse({
            'success': True,
            'qr_code': qr_code,
            'backup_codes': backup_codes
        })
    except Exception as e:
        logger.error(f"2FA setup error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'An error occurred during 2FA setup'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def verify_2fa_setup(request):
    """Verify 2FA setup with token."""
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'error': 'Authentication required'
            }, status=401)

        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST.dict()

        token = data.get('token')
        if not token:
            return JsonResponse({
                'success': False,
                'error': 'Token is required'
            }, status=400)

        two_factor = TwoFactorAuth(request.user)
        if two_factor.verify_token(token):
            request.user.two_factor_enabled = True
            request.user.save()
            return JsonResponse({
                'success': True,
                'message': '2FA setup completed successfully'
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid token'
            }, status=400)
    except Exception as e:
        logger.error(f"2FA verification error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'An error occurred during 2FA verification'
        }, status=500)

@api_view(['POST'])
@permission_classes([AllowAny])
def disable_2fa(request):
    """Disable 2FA for user."""
    try:
        if not request.user.is_authenticated:
            return JsonResponse({
                'success': False,
                'error': 'Authentication required'
            }, status=401)

        if request.content_type == 'application/json':
            data = json.loads(request.body)
        else:
            data = request.POST.dict()

        token = data.get('token')
        if not token:
            return JsonResponse({
                'success': False,
                'error': 'Token is required'
            }, status=400)

        two_factor = TwoFactorAuth(request.user)
        if two_factor.verify_token(token):
            request.user.two_factor_enabled = False
            request.user.two_factor_secret = ''
            request.user.two_factor_backup_codes = []
            request.user.save()
            return JsonResponse({
                'success': True,
                'message': '2FA disabled successfully'
            })
        else:
            return JsonResponse({
                'success': False,
                'error': 'Invalid token'
            }, status=400)
    except Exception as e:
        logger.error(f"2FA disable error: {str(e)}")
        return JsonResponse({
            'success': False,
            'error': 'An error occurred while disabling 2FA'
        }, status=500)