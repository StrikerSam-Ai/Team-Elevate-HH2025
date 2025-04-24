class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check if request is for API
        is_api_request = request.path.startswith('/api/')
        
        response = self.get_response(request)
        
        # Add security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        
        # Only add CORS headers for API requests
        if is_api_request:
            response['Access-Control-Allow-Credentials'] = 'true'
            
        return response