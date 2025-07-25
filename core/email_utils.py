from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags

def send_welcome_email(user):
    """Send welcome email to new users."""
    context = {
        'user': user,
        'email': user.email,
        'site_url': settings.SITE_URL,
    }
    
    html_message = render_to_string('emails/welcome.html', context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject='Welcome to Elevate!',
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )

def send_password_reset_email(user, reset_url):
    """Send password reset email."""
    context = {
        'user': user,
        'email': user.email,
        'reset_url': reset_url,
    }
    
    html_message = render_to_string('emails/password_reset.html', context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject='Reset Your Password - Elevate',
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    )

def send_event_reminder_email(user, event):
    """Send event reminder email."""
    context = {
        'user': user,
        'email': user.email,
        'event': event,
        'site_url': settings.SITE_URL,
    }
    
    html_message = render_to_string('emails/event_reminder.html', context)
    plain_message = strip_tags(html_message)
    
    send_mail(
        subject=f'Reminder: {event.title}',
        message=plain_message,
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        html_message=html_message,
    ) 