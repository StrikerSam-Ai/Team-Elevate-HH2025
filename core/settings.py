"""
Django settings for core project.

Generated by 'django-admin startproject' using Django 5.2.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.2/ref/settings/
"""
import os
from dotenv import load_dotenv

# Load the .env file
load_dotenv()

# Access your Groq API Key
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
from pathlib import Path
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent  # New way using pathlib


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-n2651=di7*&8!gnj359su7c528pw_kz+$&jqw@^ds4!o_t!%dm'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
<<<<<<< HEAD
    'corsheaders',  # Add this line
=======
    'rest_framework',
    'rest_framework_simplejwt.token_blacklist',
    'channels',
    'corsheaders'
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d
    'companions',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
<<<<<<< HEAD
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Whitenoise for static files
=======
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS middleware
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            os.path.join(BASE_DIR, 'frontend', 'build'),  # React build directory
            os.path.join(BASE_DIR, 'templates'),
        ],
        'APP_DIRS': True,  # Allows Django to find templates inside app directories
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


WSGI_APPLICATION = 'core.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'seniorcompanion',
        'USER': 'djangouser',
        'PASSWORD': 'newpassword123!',  # Must match what you set above
        'HOST': 'localhost',
        'PORT':'5432',
        }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True

APPEND_SLASH = True

CORS_ALLOW_ALL_ORIGINS = True 

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

# Static files
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend', 'build', 'static'),  # React static files
    os.path.join(BASE_DIR, 'static'),
]
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Add this for Django to serve React frontend
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000', # Assuming your frontend runs here
    'http://127.0.0.1:3000',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
]
CORS_ALLOW_ALL_ORIGINS = DEBUG  # Allow all origins in development

# Whitenoise for static files
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

AUTH_USER_MODEL = 'companions.CustomUser'

<<<<<<< HEAD
# Custom login URL setup:
LOGIN_URL = 'companions:login_page'
LOGIN_REDIRECT_URL = 'companions:home'
LOGOUT_REDIRECT_URL = 'companions:home'

# ... rest of settings ...
=======
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost",  # Add your frontend origin
]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:8000",
    "http://127.0.0.1:8000",
    "http://localhost",
]
>>>>>>> 80d9ef0d5dab9ef00ce5fe8b19b03a87ca4e474d
