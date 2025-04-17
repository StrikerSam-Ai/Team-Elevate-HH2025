from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),  # Make login the default landing page
    path('home/', views.home, name='home'),    # Change home to a different URL
    path('login/', views.login_user, name='login-user'),  # Keep the API endpoint
    path('register/', views.register_user, name='register-user'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.profile_update, name='profile_update'),
    path('test/', views.test_view, name='test-view'),
    path('logout/', views.logout_view, name='logout'),
]