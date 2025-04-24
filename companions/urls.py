from django.urls import path
from . import views

app_name = 'companions'

urlpatterns = [
    # Auth endpoints
    path('auth/csrf/', views.get_csrf_token, name='csrf-token'),
    path('auth/check/', views.check_auth, name='check-auth'),
    path('auth/login/', views.login_user, name='login-api'),
    path('auth/register/', views.register_user, name='register-api'),
    path('auth/logout/', views.logout_view, name='logout-api'),
    
    # Profile endpoints
    path('profile/', views.profile_api, name='profile-api'),
    path('profile/update/', views.profile_update_view, name='profile-update'),
    
    # Community endpoints
    path('communities/', views.community_list, name='community-list'),
    path('communities/create/', views.create_community, name='create-community'),
    path('communities/<int:community_id>/', views.community_detail, name='community-detail'),
    path('communities/<int:community_id>/join/', views.join_community, name='join-community'),
    
    # AI endpoints
    path('text-generation/', views.TextGenerationView, name='text-generation'),
]