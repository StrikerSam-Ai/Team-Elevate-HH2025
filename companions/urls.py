from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_user, name='login'),
    path('register/', views.register_user, name='register-user'),
    path('api/token/', views.login_user, name='login-user'),
    path('test/', views.test_view, name='test-view'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.profile_update, name='profile_update'),
    path('community/', views.community_list, name='community_list'),
    path('community/join/<int:community_id>/', views.join_community, name='join_community'),
    path('community/create/', views.create_community, name='create_community'),
    path('community/<int:community_id>/', views.community_detail, name='community_detail'),
]