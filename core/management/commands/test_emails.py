from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from core.email_utils import send_welcome_email, send_password_reset_email, send_event_reminder_email
from datetime import datetime, timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Test all email templates'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, help='Email address to send test emails to')

    def handle(self, *args, **options):
        test_email = options['email'] or 'test@example.com'
        
        # Create a test user
        test_user = User(
            email=test_email,
            first_name='Test',
            last_name='User'
        )
        
        # Test welcome email
        self.stdout.write('Testing welcome email...')
        send_welcome_email(test_user)
        
        # Test password reset email
        self.stdout.write('Testing password reset email...')
        reset_url = 'http://localhost:8000/reset-password?token=test-token'
        send_password_reset_email(test_user, reset_url)
        
        # Test event reminder email
        self.stdout.write('Testing event reminder email...')
        test_event = type('Event', (), {
            'id': 1,
            'title': 'Test Event',
            'description': 'This is a test event',
            'start_time': datetime.now() + timedelta(days=1),
            'location': 'Virtual Meeting Room'
        })
        send_event_reminder_email(test_user, test_event)
        
        self.stdout.write(self.style.SUCCESS('All test emails sent successfully!'))
        self.stdout.write(f'Check your console for the email contents.') 