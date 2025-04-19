from django.urls import path
from . import views

app_name = 'companions'

urlpatterns = [
    # Authentication endpoints
    path('', views.home_view, name='home'),
    path('login/', views.login_view, name='login_page'),  # Handles GET requests to render the login page
    path('login/submit/', views.login_user, name='login_submit'),  # Handles POST requests for login
    path('register/', views.register_user, name='register'),
    path('logout/', views.logout_view, name='logout'),
    path('get-csrf-token/', views.get_csrf_token, name='get-csrf-token'),

    # Main app pages
    path('profile/', views.profile_view, name='profile'),
    path('profile/update/', views.profile_update_view, name='profile_update'),
    path('app/', views.react_app_view, name='react-app'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('settings/', views.settings_view, name='settings'),
    path('home/', views.home_view, name='home_alt'),
    
    # Community pages
    path('community/', views.community_view, name='community'),
    path('community/list/', views.community_list, name='community_list'),
    path('community/join/<int:community_id>/', views.join_community, name='join_community'),
    path('community/create/', views.create_community, name='create_community'),
    path('community/<int:community_id>/', views.community_detail, name='community_detail'),
    
    # API endpoints
    path('api/check-auth/', views.check_auth, name='check-auth'),
    path('api/profile/', views.profile_api, name='profile-api'),
    path('api/generate-text/', views.TextGenerationView, name='generate_text'),
    path('api/generate-text', views.TextGenerationView, name='generate_text_no_slash'),
    
    # Test routes
    path('test/', views.test_view, name='test-view'),
]