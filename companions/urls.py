from django.urls import path
from . import views

app_name = 'companions'

urlpatterns = [
    # API endpoints
    path('check-auth/', views.check_auth, name='check-auth'),
    path('profile/', views.profile_api, name='profile-api'),
    path('generate-text/', views.TextGenerationView, name='generate_text'),
    path('generate-text', views.TextGenerationView, name='generate_text_no_slash'),
    path('communities/', views.community_list, name='community_list'),
    path('communities/<int:community_id>/join/', views.join_community, name='join_community'),
    path('communities/<int:community_id>/', views.community_detail, name='community_detail'),
    
    # Auth endpoints
    path('login/', views.login_user, name='login_submit'),
    path('register/', views.register_user, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),
]