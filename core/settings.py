"""
Django settings for core project."""
import os
from datetime import timedelta
from pathlib import Path
import environ
from .env_validator import validate_environment
from .password_validators import PasswordValidator

# Initialize environ
env = environ.Env(
    DEBUG=(bool, False),
    DJANGO_ENV=(str, "development"),
    RATE_LIMIT_REQUESTS=(int, 100),
    RATE_LIMIT_PERIOD=(int, 60),
    JWT_ACCESS_TOKEN_LIFETIME=(int, 5),
    JWT_REFRESH_TOKEN_LIFETIME=(int, 1440),
)

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Take environment variables from .env file
environ.Env.read_env(os.path.join(BASE_DIR, '.env'))

# Validate environment variables
validate_environment()

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('DJANGO_SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG')

# Environment-specific settings
DJANGO_ENV = env('DJANGO_ENV')
ALLOWED_HOSTS = env('ALLOWED_HOSTS', default='localhost,127.0.0.1').split(',')

# Security settings
SECURE_SSL_REDIRECT = not DEBUG
SESSION_COOKIE_SECURE = env('SESSION_COOKIE_SECURE', default=str(not DEBUG)).lower() == 'true'
CSRF_COOKIE_SECURE = env('CSRF_COOKIE_SECURE', default=str(not DEBUG)).lower() == 'true'
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'
SECURE_HSTS_SECONDS = 31536000 if not DEBUG else 0
SECURE_HSTS_INCLUDE_SUBDOMAINS = not DEBUG
SECURE_HSTS_PRELOAD = not DEBUG

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
        'OPTIONS': {
            'min_length': 12,
        }
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
    {
        'NAME': 'core.password_validators.PasswordValidator',
    },
]

# Session security
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_SAVE_EVERY_REQUEST = True

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'core.apps.CoreConfig',
    'companions.apps.CompanionsConfig',
    'channels',
    'django_filters',
    'axes',  # For login attempt tracking
    'django_otp',  # For two-factor authentication
]

# Remove debug_toolbar in production
if DEBUG:
    INSTALLED_APPS += ['debug_toolbar']

# Custom authentication backend
AUTHENTICATION_BACKENDS = [
    'axes.backends.AxesBackend',  # Must be first
    'companions.backends.EmailBackend',
    'django.contrib.auth.backends.ModelBackend',
]

# Custom user model
AUTH_USER_MODEL = 'companions.CustomUser'

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'core.csrf_middleware.CSRFMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django_otp.middleware.OTPMiddleware',  # For two-factor authentication
    'axes.middleware.AxesMiddleware',  # For login attempt tracking
    'core.security_middleware.SecurityMiddleware',  # Our custom security middleware
    'core.rate_limit.RateLimitMiddleware',  # Our custom rate limiting middleware
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Axes settings (login attempt tracking)
AXES_FAILURE_LIMIT = 5
AXES_LOCK_OUT_AT_FAILURE = True
AXES_COOLOFF_TIME = 1  # hours
AXES_LOCKOUT_TEMPLATE = 'axes/lockout.html'
AXES_LOCKOUT_BY_IP = True
AXES_LOCKOUT_BY_USER = True
AXES_LOCKOUT_BY_COMBINATION_USER_AND_IP = True

# Django REST Framework settings
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_VERSIONING_CLASS': 'rest_framework.versioning.URLPathVersioning',
    'DEFAULT_VERSION': 'v1',
    'ALLOWED_VERSIONS': ['v1'],
    'VERSION_PARAM': 'version',
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=env('JWT_ACCESS_TOKEN_LIFETIME')),
    'REFRESH_TOKEN_LIFETIME': timedelta(minutes=env('JWT_REFRESH_TOKEN_LIFETIME')),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': env('JWT_SECRET_KEY'),
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',
}

# CORS settings
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = env('CORS_ALLOWED_ORIGINS', default='http://localhost:3000,http://127.0.0.1:3000').split(',')
CSRF_TRUSTED_ORIGINS = env('CSRF_TRUSTED_ORIGINS', default='http://localhost:3000,http://127.0.0.1:3000').split(',')
CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Channels configuration
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer' if not DEBUG else 'channels.layers.InMemoryChannelLayer',
        'CONFIG': {
            "hosts": [(env('CHANNEL_LAYERS_REDIS_HOST', default='127.0.0.1'), 
                      env('CHANNEL_LAYERS_REDIS_PORT', default=6379))],
        } if not DEBUG else {},
    },
}

# Database configuration
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': env('DB_PORT'),
        'CONN_MAX_AGE': 60,  # Connection lifetime in seconds
        'OPTIONS': {
            'connect_timeout': 10,
            'keepalives': 1,
            'keepalives_idle': 30,
            'keepalives_interval': 10,
            'keepalives_count': 5,
        },
        'TEST': {
            'NAME': 'test_db',
        },
    }
}

# Cache configuration
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': env('REDIS_URL', default='redis://127.0.0.1:6379/1'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'RETRY_ON_TIMEOUT': True,
            'MAX_CONNECTIONS': 1000,
            'CONNECTION_POOL_KWARGS': {'max_connections': 100},
        },
        'KEY_PREFIX': 'elevate',
        'TIMEOUT': 300,  # 5 minutes
    },
    'query_cache': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': env('REDIS_URL', default='redis://127.0.0.1:6379/2'),
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'SOCKET_CONNECT_TIMEOUT': 5,
            'SOCKET_TIMEOUT': 5,
            'RETRY_ON_TIMEOUT': True,
            'MAX_CONNECTIONS': 1000,
            'CONNECTION_POOL_KWARGS': {'max_connections': 100},
        },
        'KEY_PREFIX': 'elevate_query',
        'TIMEOUT': 3600,  # 1 hour
    }
}

# Database optimization settings
DB_OPTIMIZATION = {
    'CONNECTION_POOL_SIZE': 20,
    'MAX_OVERFLOW': 10,
    'POOL_TIMEOUT': 30,
    'POOL_RECYCLE': 1800,  # 30 minutes
    'ECHO': False,
    'POOL_PRE_PING': True,
}

# Query cache settings
QUERY_CACHE = {
    'ENABLED': True,
    'TIMEOUT': 3600,  # 1 hour
    'MAX_ENTRIES': 1000,
    'CULL_FREQUENCY': 3,
}

# Database backup settings
DB_BACKUP = {
    'BACKUP_DIR': os.path.join(BASE_DIR, 'backups'),
    'BACKUP_FORMAT': 'custom',
    'BACKUP_COMPRESSION': True,
    'BACKUP_RETENTION_DAYS': 7,
}

# Session configuration
SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
SESSION_CACHE_ALIAS = 'default'

# Email configuration
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = 'Elevate <noreply@elevate.com>'
SITE_URL = env('SITE_URL', default='http://localhost:8000')

# Email templates
EMAIL_TEMPLATES = {
    'welcome': 'emails/welcome.html',
    'password_reset': 'emails/password_reset.html',
    'event_reminder': 'emails/event_reminder.html',
}

# Templates configuration
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'core.context_processors.common_variables',
            ],
        },
    },
]

# Static files configuration
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

# Media files configuration
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
    },
    'handlers': {
        'file': {
            'level': env('LOG_LEVEL', default='INFO'),
            'class': 'logging.FileHandler',
            'filename': env('LOG_FILE', default=os.path.join(BASE_DIR, 'logs', 'elevate.log')),
            'formatter': 'verbose',
        },
        'console': {
            'level': env('LOG_LEVEL', default='INFO'),
            'class': 'logging.StreamHandler',
            'formatter': 'verbose',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': env('LOG_LEVEL', default='INFO'),
            'propagate': True,
        },
    },
}

# Create logs directory if it doesn't exist
os.makedirs(os.path.join(BASE_DIR, 'logs'), exist_ok=True)

# Debug toolbar settings
INTERNAL_IPS = ['127.0.0.1']
DEBUG_TOOLBAR_CONFIG = {
    'SHOW_TOOLBAR_CALLBACK': lambda request: DEBUG,
}

# Whitenoise configuration
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage' if not DEBUG else 'django.contrib.staticfiles.storage.StaticFilesStorage'

# URL Configuration
ROOT_URLCONF = 'core.urls'

# Debug Toolbar settings
if DEBUG:
    INTERNAL_IPS = [
        '127.0.0.1',
    ]
    DEBUG_TOOLBAR_CONFIG = {
        'SHOW_TOOLBAR_CALLBACK': lambda request: DEBUG,
    }
