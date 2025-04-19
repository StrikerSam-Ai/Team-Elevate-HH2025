from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout, update_session_auth_hash
from django.contrib.auth.decorators import login_required
from django.views.decorators.http import require_http_methods, require_POST
from django.middleware.csrf import get_token
from django.views.generic import TemplateView
from .models import CustomUser
import logging
import json

logger = logging.getLogger(__name__)

# --- Authentication and Home Views ---

def login_view(request):
    """Display the login page."""
    if request.user.is_authenticated:
        return redirect('companions:home')
    return render(request, 'html/login.html')

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    """Handle login API request."""
    data = json.loads(request.body)
    email = data.get('email')
    password = data.get('password')
    logger.debug(f"Attempting login with email: {email}")
    user = authenticate(request, email=email, password=password)
    if user is not None:
        login(request, user)
        logger.debug("Login successful")
        return JsonResponse({
            'success': True,
            'redirect': '/home/'
        })
    logger.debug("Login failed: Invalid credentials")
    return JsonResponse({
        'success': False,
        'error': 'Invalid credentials'
    }, status=400)

@csrf_exempt
@require_http_methods(["GET", "POST"])
def register_user(request):
    """Handle user registration."""
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            # Create user with provided data
            user = CustomUser.objects.create_user(
                email=data.get('email'),
                password=data.get('password'),
                name=data.get('name'),
                birth_date=data.get('birth_date'),
                phone=data.get('phone'),
                city=data.get('city')
            )
            login(request, user)
            return JsonResponse({
                'success': True,
                'redirect': '/home/'
            })
        except Exception as e:
            return JsonResponse({
                'success': False,
                'error': str(e)
            }, status=400)
    return render(request, 'html/register.html')

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

# --- Other Views ---

def get_csrf_token(request):
    """Get a CSRF token for AJAX requests."""
    token = get_token(request)
    return JsonResponse({'csrfToken': token})

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

from django.views.static import serve

def serve_static(request, path, document_root=None):
    return serve(request, path, document_root=document_root)

# Add this class-based view for serving React
class ReactAppView(TemplateView):
    template_name = "frontend/build/index.html"