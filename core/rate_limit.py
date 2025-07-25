from django.core.cache import cache
from django.http import HttpResponse
from django.conf import settings
import time
from typing import Optional, Tuple

class RateLimitMiddleware:
    """
    Middleware to implement rate limiting for API endpoints.
    """
    def __init__(self, get_response):
        self.get_response = get_response
        self.rate_limit_requests = getattr(settings, 'RATE_LIMIT_REQUESTS', 100)
        self.rate_limit_period = getattr(settings, 'RATE_LIMIT_PERIOD', 60)

    def __call__(self, request):
        if not self._should_rate_limit(request):
            return self.get_response(request)

        client_ip = self._get_client_ip(request)
        endpoint = request.path

        # Check if the request should be rate limited
        if self._is_rate_limited(client_ip, endpoint):
            return self._rate_limit_response()

        return self.get_response(request)

    def _should_rate_limit(self, request) -> bool:
        """
        Determine if the request should be rate limited.
        """
        # Only rate limit API endpoints
        if not request.path.startswith('/api/'):
            return False

        # Don't rate limit certain endpoints
        excluded_paths = [
            '/api/health/',
            '/api/docs/',
        ]
        if request.path in excluded_paths:
            return False

        return True

    def _get_client_ip(self, request) -> str:
        """
        Get the client's IP address.
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            return x_forwarded_for.split(',')[0]
        return request.META.get('REMOTE_ADDR', 'unknown')

    def _get_cache_key(self, client_ip: str, endpoint: str) -> str:
        """
        Generate a cache key for rate limiting.
        """
        return f'rate_limit:{client_ip}:{endpoint}'

    def _is_rate_limited(self, client_ip: str, endpoint: str) -> bool:
        """
        Check if the request should be rate limited.
        """
        cache_key = self._get_cache_key(client_ip, endpoint)
        current_time = int(time.time())
        
        # Get the current rate limit data
        rate_limit_data = cache.get(cache_key, {'count': 0, 'reset_time': current_time + self.rate_limit_period})
        
        # Check if we need to reset the counter
        if current_time > rate_limit_data['reset_time']:
            rate_limit_data = {'count': 0, 'reset_time': current_time + self.rate_limit_period}
        
        # Increment the counter
        rate_limit_data['count'] += 1
        
        # Store the updated data
        cache.set(cache_key, rate_limit_data, self.rate_limit_period)
        
        # Check if we've exceeded the rate limit
        return rate_limit_data['count'] > self.rate_limit_requests

    def _rate_limit_response(self) -> HttpResponse:
        """
        Return a rate limit response.
        """
        response = HttpResponse("Too Many Requests", content_type="text/plain", status=429)
        response['Retry-After'] = str(self.rate_limit_period)
        return response

    def _get_remaining_requests(self, client_ip: str, endpoint: str) -> Tuple[int, int]:
        """
        Get the number of remaining requests and the time until reset.
        """
        cache_key = self._get_cache_key(client_ip, endpoint)
        rate_limit_data = cache.get(cache_key, {'count': 0, 'reset_time': int(time.time()) + self.rate_limit_period})
        
        remaining = max(0, self.rate_limit_requests - rate_limit_data['count'])
        reset_time = max(0, rate_limit_data['reset_time'] - int(time.time()))
        
        return remaining, reset_time
