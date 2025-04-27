from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
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

logger = logging.getLogger(__name__)

def login_view(request):
    """Display the login page."""
    if request.user.is_authenticated:
        return redirect('companions:home')
    return render(request, 'html/login.html')

@api_view(['POST'])
@permission_classes([AllowAny])
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

        # Use authenticate with email parameter
        user = authenticate(request, email=email, password=password)
        logger.info(f"Authentication result: {'success' if user else 'failed'}")
        
        if user is not None:
            if user.is_active:
                login(request, user)
                
                # Create a simple token (use JWT in production)
                from django.contrib.auth.tokens import default_token_generator
                token = default_token_generator.make_token(user)
                
                logger.info(f"Login successful for user: {email}")
                return JsonResponse({
                    'success': True,
                    'token': token,
                    'user': {
                        'email': user.email,
                        'name': user.name,
                        'id': user.id
                    }
                })
            else:
                logger.error(f"Login failed - Account disabled for: {email}")
                return JsonResponse({
                    'success': False,
                    'error': 'Account is disabled'
                }, status=401)
            
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
    return render(request, 'html/home.html')

# --- Profile Views ---


@login_required
def profile_view(request):
    """Render the user profile page."""
    return render(request, 'html/profile.html')

@login_required
@require_POST
def profile_update_view(request):
    """Handle the profile update form submission."""
    user = request.user
    # Example: update first and last name
    user.first_name = request.POST.get('first_name', user.first_name)
    user.last_name = request.POST.get('last_name', user.last_name)
    user.save()
    return redirect('companions:profile')

@login_required
def profile_api(request):
    """API endpoint for profile data."""
    # Return profile data as JSON
    data = {
        'username': request.user.username,
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
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


@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf_token(request):
    """
    Returns CSRF token for the frontend to use in subsequent requests
    """
    return JsonResponse({'csrfToken': get_token(request)})

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
            'email': getattr(request.user, 'email', ''),
            'name': request.user.first_name or request.user.username,
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
    if request.method == "POST":
        try:
            # Parse JSON data
            try:
                data = json.loads(request.body)
            except json.JSONDecodeError:
                return JsonResponse({"error": "Invalid JSON"}, status=400)
                
            prompt = data.get("prompt", "")
            language = data.get("language", "english")

            # Debug print
            print(f"Received request - Prompt: {prompt}, Language: {language}")

            # Call Groq API
            headers = {
                "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
                "Content-Type": "application/json",
            }
            
            payload = {
                "model": "llama3-70b-8192",
                "messages": [
                    {"role": "system", "content": f"You are a helpful assistant who replies in {language}."},
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.7
            }

            response = requests.post(
                "https://api.groq.com/openai/v1/chat/completions",
                headers=headers,
                json=payload
            )

            # Debug print
            print(f"Groq API response: {response.status_code}")

            if response.status_code == 200:
                content = response.json()["choices"][0]["message"]["content"]
                return JsonResponse({"response": content})
            else:
                return JsonResponse(
                    {"error": f"Groq API error: {response.text}"},
                    status=response.status_code
                )

        except Exception as e:
            print(f"Server error: {str(e)}")  # Debug print
            return JsonResponse(
                {"error": f"Server error: {str(e)}"},
                status=500
            )
    return JsonResponse({"error": "Method not allowed"}, status=405)
    
def homeView(request):
    return render(request, 'chatb.html')
    
class ReactAppView(TemplateView):
    template_name = 'html/react_app.html'

# Event endpoints
@login_required
def events_list(request):
    """API endpoint for listing events."""
    # Placeholder data for events
    events = [
        {
            'id': 1,
            'title': 'Hackathon 2025',
            'description': 'Join us for the annual hackathon!',
            'start_date': '2025-05-15T09:00:00Z',
            'end_date': '2025-05-17T18:00:00Z',
            'location': 'Virtual',
            'organizer': 'Tech Community'
        },
        {
            'id': 2,
            'title': 'Workshop: AI for Beginners',
            'description': 'Learn the basics of AI and machine learning.',
            'start_date': '2025-05-10T14:00:00Z',
            'end_date': '2025-05-10T17:00:00Z',
            'location': 'Tech Hub',
            'organizer': 'AI Enthusiasts'
        }
    ]
    return JsonResponse({'events': events})

@login_required
def create_event(request):
    """API endpoint for creating an event."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Here you would create the event in the database
            return JsonResponse({'success': True, 'event_id': 3})  # placeholder ID
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def event_detail(request, event_id):
    """API endpoint for event details."""
    # Placeholder data for event detail
    if event_id == 1:
        event = {
            'id': 1,
            'title': 'Hackathon 2025',
            'description': 'Join us for the annual hackathon!',
            'start_date': '2025-05-15T09:00:00Z',
            'end_date': '2025-05-17T18:00:00Z',
            'location': 'Virtual',
            'organizer': 'Tech Community',
            'attendees': 45
        }
        return JsonResponse(event)
    return JsonResponse({'error': 'Event not found'}, status=404)

@login_required
def join_event(request, event_id):
    """API endpoint for joining an event."""
    if request.method == 'POST':
        # Here you would record the user joining the event
        return JsonResponse({'success': True, 'message': 'Successfully joined the event'})
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def upcoming_events(request):
    """API endpoint for upcoming events."""
    # Placeholder data for upcoming events
    events = [
        {
            'id': 1,
            'title': 'Hackathon 2025',
            'description': 'Join us for the annual hackathon!',
            'start_date': '2025-05-15T09:00:00Z',
            'end_date': '2025-05-17T18:00:00Z',
            'location': 'Virtual',
            'organizer': 'Tech Community'
        }
    ]
    return JsonResponse({'events': events})

@login_required
def past_events(request):
    """API endpoint for past events."""
    # Placeholder data for past events
    events = [
        {
            'id': 2,
            'title': 'Workshop: Intro to React',
            'description': 'Learn the basics of React.',
            'start_date': '2025-03-10T14:00:00Z',
            'end_date': '2025-03-10T17:00:00Z',
            'location': 'Tech Hub',
            'organizer': 'JavaScript Enthusiasts'
        }
    ]
    return JsonResponse({'events': events})

# Journal endpoints
@login_required
def journal_list(request):
    """API endpoint for listing journal entries."""
    # Placeholder data for journal entries
    entries = [
        {
            'id': 1,
            'title': 'My First Journal Entry',
            'content': 'This is a placeholder journal entry.',
            'created_at': '2025-04-15T10:00:00Z'
        },
        {
            'id': 2,
            'title': 'Reflections on the Hackathon',
            'content': 'Thoughts about participating in the hackathon.',
            'created_at': '2025-04-20T15:30:00Z'
        }
    ]
    return JsonResponse({'entries': entries})

@login_required
def create_journal(request):
    """API endpoint for creating a journal entry."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # Here you would create the journal entry in the database
            return JsonResponse({'success': True, 'entry_id': 3})  # placeholder ID
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def update_journal(request, journal_id):
    """API endpoint for updating a journal entry."""
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            # Here you would update the journal entry in the database
            return JsonResponse({'success': True})
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def delete_journal(request, journal_id):
    """API endpoint for deleting a journal entry."""
    if request.method == 'DELETE':
        # Here you would delete the journal entry from the database
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Method not allowed'}, status=405)

@login_required
def verify_journal(request, hash):
    """API endpoint for verifying a journal entry."""
    # Placeholder verification logic
    return JsonResponse({
        'verified': True,
        'entry': {
            'id': 1,
            'title': 'My First Journal Entry',
            'content': 'This is a placeholder journal entry.',
            'created_at': '2025-04-15T10:00:00Z',
            'hash': hash
        }
    })

@login_required
def summarize_text(request):
    """API endpoint for summarizing text using AI."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            text = data.get('text')
            if not text:
                return JsonResponse({'error': 'No text provided'}, status=400)
                
            # This would normally call an AI service to summarize text
            # For now, we'll return a placeholder summary
            summary = "This is a placeholder summary of the provided text."
            
            return JsonResponse({'summary': summary})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
    return JsonResponse({'error': 'Method not allowed'}, status=405)