from django.utils.deprecation import MiddlewareMixin
from django.conf import settings
import re

class SecurityMiddleware(MiddlewareMixin):
    """
    Middleware to handle various security headers and protections.
    """
    def process_response(self, request, response):
        # Content Security Policy
        csp_policies = [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: https:",
            "font-src 'self'",
            "connect-src 'self'",
            "frame-ancestors 'none'",
            "form-action 'self'",
            "base-uri 'self'",
            "object-src 'none'"
        ]
        response['Content-Security-Policy'] = '; '.join(csp_policies)

        # XSS Protection
        response['X-XSS-Protection'] = '1; mode=block'

        # Prevent MIME type sniffing
        response['X-Content-Type-Options'] = 'nosniff'

        # Prevent clickjacking
        response['X-Frame-Options'] = 'DENY'

        # Strict Transport Security
        if not settings.DEBUG:
            response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload'

        # Referrer Policy
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'

        # Feature Policy
        feature_policies = [
            "geolocation 'none'",
            "midi 'none'",
            "sync-xhr 'self'",
            "microphone 'none'",
            "camera 'none'",
            "magnetometer 'none'",
            "gyroscope 'none'",
            "speaker 'none'",
            "fullscreen 'self'",
            "payment 'none'"
        ]
        response['Permissions-Policy'] = ', '.join(feature_policies)

        # Cache Control
        if request.path.startswith('/api/'):
            response['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'

        return response

    def process_request(self, request):
        # Block requests with suspicious headers
        suspicious_headers = [
            'HTTP_X_FORWARDED_FOR',
            'HTTP_X_FORWARDED_HOST',
            'HTTP_X_FORWARDED_PROTO',
            'HTTP_X_FORWARDED_PORT',
        ]
        
        for header in suspicious_headers:
            if header in request.META:
                return self._block_request(request, f"Suspicious header detected: {header}")

        # Block requests with suspicious user agents
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        suspicious_patterns = [
            r'(?i)(sql|script|eval|exec|system|cmd|shell)',
            r'(?i)(union|select|insert|update|delete|drop)',
            r'(?i)(alert|prompt|confirm)',
            r'(?i)(<script|javascript:)',
        ]

        for pattern in suspicious_patterns:
            if re.search(pattern, user_agent):
                return self._block_request(request, "Suspicious user agent detected")

        return None

    def _block_request(self, request, reason):
        """
        Block the request and return a 403 Forbidden response.
        """
        from django.http import HttpResponseForbidden
        return HttpResponseForbidden(f"Access denied: {reason}") 