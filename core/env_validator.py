import os
from django.core.exceptions import ImproperlyConfigured
from typing import List, Dict

class EnvironmentValidator:
    REQUIRED_VARS = {
        'DJANGO_SECRET_KEY': 'Secret key for Django',
        'JWT_SECRET_KEY': 'Secret key for JWT tokens',
    }

    OPTIONAL_VARS = {
        'DEBUG': 'Debug mode (default: False)',
        'DJANGO_ENV': 'Environment (development/production)',
        'ALLOWED_HOSTS': 'Comma-separated list of allowed hosts',
        'DB_ENGINE': 'Database engine (sqlite/postgres)',
        'REDIS_URL': 'Redis connection URL',
        'EMAIL_BACKEND': 'Email backend configuration',
        'LOG_LEVEL': 'Logging level',
        'RATE_LIMIT_REQUESTS': 'Number of requests allowed per period',
        'RATE_LIMIT_PERIOD': 'Rate limit period in seconds',
        'GROQ_API_KEY': 'API key for Groq LLM service',
    }

    @classmethod
    def validate(cls) -> Dict[str, List[str]]:
        """
        Validate environment variables and return any issues found.
        Returns a dictionary with 'errors' and 'warnings' lists.
        """
        issues = {
            'errors': [],
            'warnings': []
        }

        # Check required variables
        for var, description in cls.REQUIRED_VARS.items():
            if not os.getenv(var):
                issues['errors'].append(f"Missing required environment variable: {var} ({description})")

        # Check optional variables
        for var, description in cls.OPTIONAL_VARS.items():
            if not os.getenv(var):
                issues['warnings'].append(f"Missing optional environment variable: {var} ({description})")

        # Validate specific variables
        cls._validate_debug(issues)
        cls._validate_database(issues)
        cls._validate_security(issues)

        return issues

    @classmethod
    def _validate_debug(cls, issues: Dict[str, List[str]]) -> None:
        """Validate debug-related settings."""
        if os.getenv('DEBUG', 'False').lower() == 'true' and os.getenv('DJANGO_ENV') == 'production':
            issues['warnings'].append("Debug mode is enabled in production environment")

    @classmethod
    def _validate_database(cls, issues: Dict[str, List[str]]) -> None:
        """Validate database-related settings."""
        db_engine = os.getenv('DB_ENGINE', 'sqlite')
        if db_engine == 'postgres':
            required_db_vars = ['DB_NAME', 'DB_USER', 'DB_PASSWORD', 'DB_HOST', 'DB_PORT']
            for var in required_db_vars:
                if not os.getenv(var):
                    issues['errors'].append(f"Missing required PostgreSQL configuration: {var}")

    @classmethod
    def _validate_security(cls, issues: Dict[str, List[str]]) -> None:
        """Validate security-related settings."""
        if os.getenv('DJANGO_ENV') == 'production':
            if os.getenv('SESSION_COOKIE_SECURE', 'False').lower() != 'true':
                issues['warnings'].append("SESSION_COOKIE_SECURE should be True in production")
            if os.getenv('CSRF_COOKIE_SECURE', 'False').lower() != 'true':
                issues['warnings'].append("CSRF_COOKIE_SECURE should be True in production")

def validate_environment():
    """
    Validate environment variables and raise ImproperlyConfigured if there are critical issues.
    """
    validator = EnvironmentValidator()
    issues = validator.validate()

    if issues['errors']:
        error_message = "Critical environment configuration issues found:\n"
        error_message += "\n".join(issues['errors'])
        raise ImproperlyConfigured(error_message)

    if issues['warnings']:
        print("Environment configuration warnings:")
        for warning in issues['warnings']:
            print(f"Warning: {warning}") 