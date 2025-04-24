from django.middleware.csrf import CsrfViewMiddleware

class CSRFMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Skip CSRF checks for specific API endpoints that require external access
        if request.path.startswith('/api/') and request.method in ('GET', 'HEAD', 'OPTIONS', 'TRACE'):
            return None
            
        # Skip CSRF checks for auth endpoints when they're API calls
        if request.path.startswith('/api/auth/') and request.content_type == 'application/json':
            return None
            
        return super().process_view(request, callback, callback_args, callback_kwargs)
        
    def process_response(self, request, response):
        # Ensure CSRF cookie is set for frontend pages
        if request.path.startswith('/') and request.method == 'GET':
            response['X-CSRFToken'] = request.META.get('CSRF_COOKIE', '')
        return response