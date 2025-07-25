from django.core.cache import cache
from django.conf import settings
from rest_framework.exceptions import Throttled
from datetime import datetime, timedelta
import pyotp
import qrcode
from io import BytesIO
import base64
import time
import secrets
import logging
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.utils import timezone

logger = logging.getLogger(__name__)
User = get_user_model()

class RateLimit:
    """Rate limiting implementation for API endpoints."""
    
    def __init__(self, key_prefix, max_attempts, window_seconds):
        self.key_prefix = key_prefix
        self.max_attempts = max_attempts
        self.window_seconds = window_seconds
    
    def is_rate_limited(self, identifier):
        """Check if the request should be rate limited."""
        cache_key = f"{self.key_prefix}:{identifier}"
        attempts = cache.get(cache_key, 0)
        
        if attempts >= self.max_attempts:
            return True
        
        cache.set(cache_key, attempts + 1, self.window_seconds)
        return False
    
    def get_remaining_attempts(self, identifier):
        """Get remaining attempts before rate limit."""
        cache_key = f"{self.key_prefix}:{identifier}"
        attempts = cache.get(cache_key, 0)
        return max(0, self.max_attempts - attempts)
    
    def get_reset_time(self, identifier):
        """Get time until rate limit resets."""
        cache_key = f"{self.key_prefix}:{identifier}"
        ttl = cache.ttl(cache_key)
        return max(0, ttl)

class TwoFactorAuth:
    """Two-factor authentication implementation."""
    
    def __init__(self, user):
        self.user = user
        self.secret = self._get_or_create_secret()
    
    def _get_or_create_secret(self):
        """Get existing 2FA secret or create a new one."""
        if not self.user.two_factor_secret:
            self.user.two_factor_secret = pyotp.random_base32()
            self.user.save()
        return self.user.two_factor_secret
    
    def generate_qr_code(self):
        """Generate QR code for 2FA setup."""
        totp = pyotp.TOTP(self.secret)
        provisioning_uri = totp.provisioning_uri(
            self.user.email,
            issuer_name="Hackhazard"
        )
        return provisioning_uri
    
    def get_qr_code(self):
        """Get QR code as base64 encoded image."""
        provisioning_uri = self.generate_qr_code()
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(provisioning_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        return base64.b64encode(buffer.getvalue()).decode()
    
    def verify_token(self, token):
        """Verify the provided 2FA token."""
        totp = pyotp.TOTP(self.secret)
        return totp.verify(token)
    
    def generate_backup_codes(self):
        """Generate backup codes for 2FA."""
        codes = [secrets.token_hex(4) for _ in range(8)]
        hashed_codes = [self._hash_code(code) for code in codes]
        
        # Store hashed backup codes
        self.user.backup_codes = hashed_codes
        self.user.save()
        
        return codes
    
    def verify_backup_code(self, code):
        """Verify a backup code."""
        if not self.user.backup_codes:
            return False
        
        hashed_code = self._hash_code(code)
        if hashed_code in self.user.backup_codes:
            # Remove used backup code
            self.user.backup_codes.remove(hashed_code)
            self.user.save()
            return True
        return False
    
    def _hash_code(self, code):
        """Hash a backup code for storage."""
        return secrets.token_hex(16)  # In production, use proper hashing

class PasswordValidator:
    """Password validation and security checks."""
    
    def __init__(self, min_length=8):
        self.min_length = min_length
    
    def validate(self, password):
        """Validate password strength."""
        if len(password) < self.min_length:
            raise ValidationError(f"Password must be at least {self.min_length} characters long.")
        
        if not any(c.isupper() for c in password):
            raise ValidationError("Password must contain at least one uppercase letter.")
        
        if not any(c.islower() for c in password):
            raise ValidationError("Password must contain at least one lowercase letter.")
        
        if not any(c.isdigit() for c in password):
            raise ValidationError("Password must contain at least one number.")
        
        if not any(c in "!@#$%^&*()_+-=[]{}|;:,.<>?" for c in password):
            raise ValidationError("Password must contain at least one special character.")
    
    def check_common_passwords(self, password):
        """Check if password is in common passwords list."""
        common_passwords = [
            "password123", "12345678", "qwerty123",
            "admin123", "welcome1", "letmein123"
        ]
        return password.lower() in common_passwords

class SessionManager:
    """Session management and security."""
    
    def __init__(self, request):
        self.request = request
    
    def create_session(self, user):
        """Create a secure session for the user."""
        # Set session expiry
        self.request.session.set_expiry(settings.SESSION_COOKIE_AGE)
        
        # Store user info
        self.request.session['user_id'] = user.id
        self.request.session['last_activity'] = timezone.now().isoformat()
        
        # Set secure flags
        self.request.session['secure'] = True
        self.request.session['httponly'] = True
    
    def update_last_activity(self):
        """Update last activity timestamp."""
        self.request.session['last_activity'] = timezone.now().isoformat()
    
    def check_session_timeout(self):
        """Check if session has timed out."""
        last_activity = self.request.session.get('last_activity')
        if not last_activity:
            return True
        
        last_activity = datetime.fromisoformat(last_activity)
        timeout = timedelta(seconds=settings.SESSION_COOKIE_AGE)
        
        return timezone.now() - last_activity > timeout
    
    def invalidate_session(self):
        """Invalidate the current session."""
        self.request.session.flush()

    def generate_totp(self):
        return pyotp.TOTP(self.secret)

    def get_qr_code(self):
        totp = self.generate_totp()
        provisioning_uri = totp.provisioning_uri(
            self.user.email,
            issuer_name="Elevate"
        )
        
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(provisioning_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        return base64.b64encode(buffer.getvalue()).decode() 