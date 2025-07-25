"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from companions import views

# API URLs
api_patterns = [
    # Auth endpoints
    path('auth/login/', views.login_user, name='api_login'),
    path('auth/register/', views.register_user, name='api_register'),
    path('auth/logout/', views.logout_view, name='api_logout'),
    path('auth/check/', views.check_auth, name='api_check_auth'),
    path('auth/token/refresh/', views.refresh_token, name='api_refresh_token'),
    
    # Profile endpoints
    path('profile/', views.profile_api, name='api_profile'),
    path('profile/preferences/', views.profile_preferences, name='api_profile_preferences'),
    path('profile/notifications/', views.profile_notifications, name='api_profile_notifications'),
    path('profile/activity/', views.profile_activity, name='api_profile_activity'),
    
    # Community endpoints
    path('communities/', views.community_list, name='api_community_list'),
    path('communities/<int:community_id>/', views.community_detail, name='api_community_detail'),
    path('communities/<int:community_id>/join/', views.join_community, name='api_join_community'),
    path('communities/<int:community_id>/members/', views.community_members, name='api_community_members'),
    
    # Events endpoints
    path('events/', views.events_list, name='api_events_list'),
    path('events/upcoming/', views.upcoming_events, name='api_upcoming_events'),
    path('events/past/', views.past_events, name='api_past_events'),
    path('events/<int:event_id>/', views.event_detail, name='api_event_detail'),
    path('events/<int:event_id>/join/', views.join_event, name='api_join_event'),
    
    # Journal endpoints
    path('journal/', views.journal_list, name='api_journal_list'),
    path('journal/create/', views.create_journal, name='api_create_journal'),
    path('journal/<int:journal_id>/', views.update_journal, name='api_update_journal'),
    path('journal/<int:journal_id>/delete/', views.delete_journal, name='api_delete_journal'),
    
    # AI endpoints
    path('ai/chat/', views.TextGenerationView, name='api_ai_chat'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('companions.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('', TemplateView.as_view(template_name='html/index.html'), name='home'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Debug toolbar URLs (only in debug mode)
if settings.DEBUG:
    urlpatterns += [
        path('__debug__/', include('debug_toolbar.urls')),
    ]

# Error handlers
handler404 = 'companions.views.handler404'
handler500 = 'companions.views.handler500'
handler403 = 'companions.views.handler403'
handler400 = 'companions.views.handler400'