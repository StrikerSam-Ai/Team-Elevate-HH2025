from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_user, name='register-user'),
    path('api/token/', views.login_user, name='login-user'),
    path('test/', views.test_view, name='test-view'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.profile_update, name='profile_update'),
]