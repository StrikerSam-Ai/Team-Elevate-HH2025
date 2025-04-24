import os
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from channels.auth import AuthMiddlewareStack
from companions.routing import websocket_urlpatterns  # ✅ safe import

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')  # Fixed settings path

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
