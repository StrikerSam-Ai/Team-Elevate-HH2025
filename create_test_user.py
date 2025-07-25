import os
import django

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from companions.models import CustomUser

def create_test_user():
    """Create a test user if it doesn't exist."""
    try:
        user = CustomUser.objects.create_user(
            email='test@example.com',
            password='Test123!',
            name='Test User'
        )
        print("Test user created successfully!")
    except Exception as e:
        print(f"Error creating test user: {str(e)}")

if __name__ == '__main__':
    create_test_user() 