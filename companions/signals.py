from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from django.db import models
from django.conf import settings

# Import your models here
try:
    from .models import Community, CommunityMembership
except ImportError:
    Community = None
    CommunityMembership = None

User = get_user_model()

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Signal handler to create associated profile when a new user is created
    """
    if created:
        # You can create any additional user-related setup here
        pass

@receiver(post_save, sender=CommunityMembership)
def handle_community_membership(sender, instance, created, **kwargs):
    """
    Signal handler for when a user joins or leaves a community
    """
    if created:
        # You could send notifications, update counters, etc.
        pass

@receiver(post_delete, sender=CommunityMembership)
def handle_community_leave(sender, instance, **kwargs):
    """
    Signal handler for when a user leaves a community
    """
    # You could send notifications, update counters, etc.
    pass

@receiver(post_save, sender=Community)
def handle_community_creation(sender, instance, created, **kwargs):
    """
    Signal handler for when a new community is created
    """
    if created:
        # Automatically add creator as a member if not already done
        CommunityMembership.objects.get_or_create(
            user=instance.created_by,
            community=instance
        )