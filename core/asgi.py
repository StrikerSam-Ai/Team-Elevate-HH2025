"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/asgi/
"""

import os
import django
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from companions import routing

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

# Get ASGI application for Django
django_asgi_app = get_asgi_application()

# Apply ASGI middleware
application = ProtocolTypeRouter({
    # HTTP requests go to Django's ASGI application
    "http": django_asgi_app,
    
    # WebSocket requests go to our custom URL router with auth middleware
    "websocket": AuthMiddlewareStack(
        URLRouter(
            routing.websocket_urlpatterns
        )
    ),
})
