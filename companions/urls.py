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
    path('profile/preferences/', views.profile_preferences, name='profile-preferences'),
    path('profile/notifications/', views.profile_notifications, name='profile-notifications'),
    path('profile/activity/', views.profile_activity, name='profile-activity'),
    
    # Community endpoints
    path('communities/', views.community_list, name='community-list'),
    path('communities/create/', views.create_community, name='create-community'),
    path('communities/<int:community_id>/', views.community_detail, name='community-detail'),
    path('communities/<int:community_id>/join/', views.join_community, name='join-community'),
    path('communities/<int:community_id>/members/', views.community_members, name='community-members'),
    path('community/posts/', views.community_posts, name='community-posts'),
    
    # Event endpoints
    path('events/', views.events_list, name='events-list'),
    path('events/create/', views.create_event, name='create-event'),
    path('events/<int:event_id>/', views.event_detail, name='event-detail'),
    path('events/<int:event_id>/join/', views.join_event, name='join-event'),
    path('events/upcoming/', views.upcoming_events, name='upcoming-events'),
    path('events/past/', views.past_events, name='past-events'),
    
    # Journal endpoints
    path('journal/', views.journal_list, name='journal-list'),
    path('journal/create/', views.create_journal, name='create-journal'),
    path('journal/<int:journal_id>/update/', views.update_journal, name='update-journal'),
    path('journal/<int:journal_id>/delete/', views.delete_journal, name='delete-journal'),
    path('journal/verify/<str:hash>/', views.verify_journal, name='verify-journal'),
    
    # AI endpoints
    path('text-generation/', views.TextGenerationView, name='text-generation'),
    path('summarize/', views.summarize_text, name='summarize-text'),
]