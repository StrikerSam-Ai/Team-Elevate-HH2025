from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_view, name='login'),  # Make login the default landing page
    path('home/', views.home, name='home'),    # Change home to a different URL
    path('login/', views.login_user, name='login-user'),  # Keep the API endpoint
    path('register/', views.register_user, name='register-user'),
    path('profile/', views.profile, name='profile'),
    path('profile/update/', views.profile_update, name='profile_update'),
    path('', homeView, name="home-view"),
    path('api/generate-text/', views.TextGenerationView, name='generate_text'),
    # Add this to handle OPTIONS requests properly:
    path('api/generate-text', views.TextGenerationView, name='generate_text_no_slash'), 
<<<<<<< HEAD
    path('community/', views.community_list, name='community_list'),
    path('community/join/<int:community_id>/', views.join_community, name='join_community'),
    path('community/create/', views.create_community, name='create_community'),
    path('community/<int:community_id>/', views.community_detail, name='community_detail'),
=======
    path('test/', views.test_view, name='test-view'),
    path('logout/', views.logout_view, name='logout'),
>>>>>>> 400b421c6146e256ac674f3832dbd7278a106b7b
]