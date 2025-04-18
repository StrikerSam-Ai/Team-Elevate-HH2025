from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Community, CommunityMembership
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


@login_required
def community_list(request):
    if request.method == 'GET':
        communities = Community.objects.all()
        return render(request, 'html/community_list.html', {'communities': communities})
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
            return render(request, 'html/community_detail.html', {'community': community})
        elif request.method == 'POST':
            message = request.POST.get('message')
            if message:
                # Save the message to the community's chat
                # Assuming you have a Message model
                # Message.objects.create(user=request.user, community=community, content=message)
                pass
            return redirect('community_detail', community_id=community_id)
    except ObjectDoesNotExist:
        return JsonResponse({"error": "Community not found"}, status=404)
    
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import json
import requests
import os

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
