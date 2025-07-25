from django.middleware.csrf import CsrfViewMiddleware

class CSRFMiddleware(CsrfViewMiddleware):
    def process_view(self, request, callback, callback_args, callback_kwargs):
        # Skip CSRF checks for read-only methods
        if request.method in ('GET', 'HEAD', 'OPTIONS', 'TRACE'):
            return None
            
        # Skip CSRF checks only for the login and register endpoints
        # All other auth endpoints still require CSRF protection
        if request.path in ['/api/auth/login/', '/api/auth/register/'] and request.content_type == 'application/json':
            return None
            
        # Handle CSRF token for React client
        if request.path.startswith('/api/') and request.content_type == 'application/json':
            # For JSON requests, get the CSRF token from X-CSRFToken header 
            # which React will send automatically
            csrf_token = request.META.get('HTTP_X_CSRFTOKEN', '')
            if csrf_token:
                request.META['CSRF_COOKIE'] = csrf_token
            
        return super().process_view(request, callback, callback_args, callback_kwargs)
        
    def process_response(self, request, response):
        # Ensure CSRF cookie is set for all responses
        response = super().process_response(request, response)
        
        # Set CSRF token in header for API responses
        if 'CSRF_COOKIE' in request.META:
            response['X-CSRFToken'] = request.META['CSRF_COOKIE']
            
        return response