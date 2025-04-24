from django.middleware.csrf import get_token
from django.utils.deprecation import MiddlewareMixin

class CSRFMiddleware(MiddlewareMixin):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        if request.path.startswith('/api/'):
            # Ensure CSRF cookie is set for API requests
            get_token(request)
        return None

    def process_response(self, request, response):
        if request.path.startswith('/api/'):
            # Ensure proper CORS headers for API responses
            response['Access-Control-Allow-Credentials'] = 'true'
            response['Access-Control-Allow-Headers'] = 'content-type, x-csrftoken'
        return response