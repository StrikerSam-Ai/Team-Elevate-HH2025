from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser, Community, CommunityMembership
from django.views.decorators.http import require_http_methods
from django.core.exceptions import ObjectDoesNotExist
import json
from django.contrib.auth.decorators import login_required
from django.contrib.auth import update_session_auth_hash


def home(request):
    return render(request, 'html/login.html')

@csrf_exempt
@require_http_methods(["GET", "POST"])
def register_user(request):
    if request.method == 'GET':
        return render(request, 'html/register.html')
    try:
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        birth_date = data.get('birth_date')
        phone = data.get('phone')
        city = data.get('city')

        if not email or not password:
            return JsonResponse({"error": "Email and password are required"}, status=400)

        # Assuming your CustomUser model has a field to store the user's name.
        user = CustomUser.objects.create_user(
            email=email,
            password=password,
            name=name,       # Save the name if applicable.
            birth_date=birth_date,
            phone=phone,
            city=city
        )
        login(request, user)  # Auto-login the user after creation
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

@login_required
def profile(request):
    if request.method == 'POST':
        # Handle profile update
        email = request.POST.get('email')
        birth_date = request.POST.get('birth_date')
        phone = request.POST.get('phone')
        city = request.POST.get('city')
        password = request.POST.get('password')
        
        user = request.user
        user.email = email
        user.birth_date = birth_date
        user.phone = phone
        user.city = city
        
        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)
        
        user.save()
        return redirect('profile')  # Redirect to the profile page after update
    else:
        # Display user's details
        return render(request, 'html/profile.html', {'user': request.user})

@login_required
def profile_update(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        birth_date = request.POST.get('birth_date')
        phone = request.POST.get('phone')
        city = request.POST.get('city')
        password = request.POST.get('password')
        
        user = request.user
        user.email = email
        user.birth_date = birth_date
        user.phone = phone
        user.city = city
        
        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)
        
        user.save()
        return JsonResponse({'message': 'Profile updated successfully'})
    else:
        return render(request, 'html/profile.html', {'user': request.user})

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