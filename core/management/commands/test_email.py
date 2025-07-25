from django.core.management.base import BaseCommand
from django.core.mail import send_mail
from django.conf import settings

class Command(BaseCommand):
    help = 'Test email configuration'

    def add_arguments(self, parser):
        parser.add_argument(
            '--email',
            type=str,
            help='Email address to send test to',
        )

    def handle(self, *args, **options):
        test_email = options['email'] or settings.EMAIL_HOST_USER
        
        try:
            # Send test email
            send_mail(
                'Test Email from Elevate',
                'This is a test email from your Django application.',
                settings.EMAIL_HOST_USER,
                [test_email],
                fail_silently=False,
            )
            self.stdout.write(self.style.SUCCESS(f'Test email sent successfully to {test_email}'))
            
            # Print email settings
            self.stdout.write('\nCurrent Email Settings:')
            self.stdout.write(f'EMAIL_BACKEND: {settings.EMAIL_BACKEND}')
            self.stdout.write(f'EMAIL_HOST: {settings.EMAIL_HOST}')
            self.stdout.write(f'EMAIL_PORT: {settings.EMAIL_PORT}')
            self.stdout.write(f'EMAIL_USE_TLS: {settings.EMAIL_USE_TLS}')
            self.stdout.write(f'EMAIL_HOST_USER: {settings.EMAIL_HOST_USER}')
            
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Failed to send test email: {str(e)}')) 