from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash

def login_view(request):
    """Render the login page."""
    if request.user.is_authenticated:
        return redirect('home')
    return render(request, 'html/login.html')

@login_required
def home(request):
    """Render the home page for logged-in users."""
    return render(request, 'html/index.html')  # Make sure to create this template

@csrf_exempt
@require_http_methods(["GET", "POST"])
def register_user(request):
    """Handle user registration."""
    if request.method == 'GET':
        if request.user.is_authenticated:
            return redirect('home')
        return render(request, 'html/register.html')
    
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        birth_date = data.get('birth_date')
        phone = data.get('phone')
        city = data.get('city')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        # Check if user already exists
        if CustomUser.objects.filter(email=email).exists():
            return JsonResponse({"error": "User with this email already exists"}, status=400)

        # Create new user - fields should match your CustomUser model
        # If your model doesn't have a name field, remove it from here
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            birth_date=birth_date,
            phone=phone,
            city=city
        )
        
        # Auto login after registration
        login(request, user)
        return JsonResponse({"message": "User registered successfully"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    """API endpoint for user login."""
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)  # Establish a session login
            return JsonResponse({"message": "Login successful"}, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@login_required
def profile(request):
    """Render the user profile page."""
    return render(request, 'html/profile.html')

@login_required
def profile_update(request):
    """Handle profile updates."""
    if request.method == 'POST':
        user = request.user
        user.email = request.POST.get('email', user.email)
        
        # Handle optional fields
        birth_date = request.POST.get('birth_date')
        if birth_date:
            user.birth_date = birth_date
            
        user.phone = request.POST.get('phone', user.phone)
        user.city = request.POST.get('city', user.city)
        
        # Update password only if provided
        password = request.POST.get('password')
        if password:
            user.set_password(password)
            
        user.save()
        return redirect('profile')
    
    return redirect('profile')

@require_http_methods(["GET"])
def test_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "This is a protected endpoint"})
    else:
        return JsonResponse({"error": "Authentication required"}, status=401)

@login_required
def profile_view(request):
    return render(request, 'html/profile.html')

from django.http import HttpResponse
from django.views.static import serve

def serve_static(request, path, document_root=None):
    return serve(request, path, document_root=document_root)

def logout_view(request):
    """Log out the user and redirect to the login page."""
    logout(request)
    return redirect('login')