from django.core.exceptions import ValidationError
from django.utils.translation import gettext as _
import re

class PasswordValidator:
    """
    Custom password validator with strong requirements.
    """
    def __init__(self, min_length=12):
        self.min_length = min_length

    def validate(self, password, user=None):
        if len(password) < self.min_length:
            raise ValidationError(
                _("Password must be at least %(min_length)d characters long."),
                code='password_too_short',
                params={'min_length': self.min_length},
            )

        if not re.search(r'[A-Z]', password):
            raise ValidationError(
                _("Password must contain at least one uppercase letter."),
                code='password_no_upper',
            )

        if not re.search(r'[a-z]', password):
            raise ValidationError(
                _("Password must contain at least one lowercase letter."),
                code='password_no_lower',
            )

        if not re.search(r'[0-9]', password):
            raise ValidationError(
                _("Password must contain at least one digit."),
                code='password_no_digit',
            )

        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
            raise ValidationError(
                _("Password must contain at least one special character."),
                code='password_no_special',
            )

        # Check for common patterns
        common_patterns = [
            r'password',
            r'123456',
            r'qwerty',
            r'admin',
            r'welcome',
            r'letmein',
            r'password123',
            r'admin123',
        ]
        
        for pattern in common_patterns:
            if re.search(pattern, password.lower()):
                raise ValidationError(
                    _("Password contains common patterns that are not allowed."),
                    code='password_common_pattern',
                )

        # Check for repeated characters
        if re.search(r'(.)\1{2,}', password):
            raise ValidationError(
                _("Password contains too many repeated characters."),
                code='password_repeated_chars',
            )

    def get_help_text(self):
        return _(
            "Your password must be at least %(min_length)d characters long and contain "
            "at least one uppercase letter, one lowercase letter, one digit, and one "
            "special character. It should not contain common patterns or too many "
            "repeated characters."
        ) % {'min_length': self.min_length} 