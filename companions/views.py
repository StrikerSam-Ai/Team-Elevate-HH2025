from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
import json

# Create your views here.

from django.http import HttpResponse
from django.shortcuts import render

def home(request):
    return render(request, 'html/login.html')
def login_view(request):
    return render(request, 'html/login.html')

@csrf_exempt
@require_http_methods(["POST"])
def register_user(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        birth_date = data.get('birth_date')
        phone = data.get('phone')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        user = CustomUser.objects.create_user(email=email, password=password, birth_date=birth_date, phone=phone)
        return JsonResponse({"message": "User registered successfully"}, status=201)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@csrf_exempt
@require_http_methods(["POST"])
def login_user(request):
    try:
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        user = authenticate(request, email=email, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return JsonResponse({
                "access": str(refresh.access_token),
                "refresh": str(refresh)
            }, status=200)
        else:
            return JsonResponse({"error": "Invalid credentials"}, status=401)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["GET"])
def test_view(request):
    if request.user.is_authenticated:
        return JsonResponse({"message": "This is a protected endpoint"})
    else:
        return JsonResponse({"error": "Authentication required"}, status=401)
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from .models import CustomUser
from django.contrib.auth import update_session_auth_hash
from django.http import JsonResponse

@login_required
def profile(request):
    user = request.user
    return render(request, 'profile/profile.html', {'user': user})

@login_required
def profile_update(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        birth_date = request.POST.get('birth_date')
        phone = request.POST.get('phone')
        password = request.POST.get('password')
        
        user = request.user
        user.username = username
        user.email = email
        user.birth_date = birth_date
        user.phone = phone
        
        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)
        
        user.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)