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
    path('community/', views.community_view, name='community'),
    path('dashboard/', views.dashboard_view, name='dashboard'),
    path('settings/', views.settings_view, name='settings'),

    # API endpoints (if any)
    path('api/check-auth/', views.check_auth, name='check-auth'),
    path('api/profile/', views.profile_api, name='profile-api'),
    path('home/', views.home_view, name='home'),
]