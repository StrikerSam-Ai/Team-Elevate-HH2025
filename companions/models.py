from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import timedelta

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class CustomUser(AbstractUser):
    username = None  # Explicitly remove the username field
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    birth_date = models.DateField(null=True, blank=True)
    phone = models.CharField(max_length=15, blank=True)
    city = models.CharField(max_length=100, blank=True)
    emergency_contact_name = models.CharField(max_length=255, blank=True)
    emergency_contact_phone = models.CharField(max_length=15, blank=True)
    emergency_contact_relationship = models.CharField(max_length=100, blank=True)
    medical_conditions = models.TextField(blank=True)
    allergies = models.TextField(blank=True)
    blood_group = models.CharField(max_length=5, blank=True)
    preferred_hospital = models.CharField(max_length=255, blank=True)
    insurance_info = models.CharField(max_length=255, blank=True)
    
    # 2FA fields
    two_factor_enabled = models.BooleanField(default=False)
    two_factor_secret = models.CharField(max_length=32, null=True, blank=True)
    backup_codes = models.JSONField(null=True, blank=True)
    
    # Security fields
    failed_login_attempts = models.IntegerField(default=0)
    last_failed_login = models.DateTimeField(null=True, blank=True)
    account_locked = models.BooleanField(default=False)
    account_locked_until = models.DateTimeField(null=True, blank=True)
    
    # Profile fields
    bio = models.TextField(max_length=500, blank=True)
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(null=True, blank=True)
    
    # Preferences
    email_notifications = models.BooleanField(default=True)
    push_notifications = models.BooleanField(default=True)
    theme_preference = models.CharField(max_length=20, default='light')
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

    def is_account_locked(self):
        if not self.account_locked:
            return False
        
        if self.account_locked_until and timezone.now() > self.account_locked_until:
            self.reset_failed_login()
            return False
        
        return True

    def increment_failed_login(self):
        self.failed_login_attempts += 1
        self.last_failed_login = timezone.now()
        
        if self.failed_login_attempts >= 5:
            self.account_locked = True
            self.account_locked_until = timezone.now() + timezone.timedelta(minutes=30)
        
        self.save()

    def reset_failed_login(self):
        self.failed_login_attempts = 0
        self.last_failed_login = None
        self.account_locked = False
        self.account_locked_until = None
        self.save()

    def get_remaining_lock_time(self):
        if not self.account_locked or not self.account_locked_until:
            return 0
        
        remaining = self.account_locked_until - timezone.now()
        return max(0, remaining.total_seconds())

    def generate_backup_codes(self):
        import secrets
        codes = [secrets.token_hex(4) for _ in range(10)]
        self.backup_codes = codes
        self.save()
        return codes

class Community(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_communities')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    category = models.CharField(
        max_length=50,
        choices=[
            ('health', 'Health Support'),
            ('hobby', 'Hobbies & Interests'),
            ('social', 'Social Activities'),
            ('support', 'General Support'),
            ('education', 'Learning & Education')
        ],
        default='social',
        null=True,  # Allow null for existing records
        blank=True  # Allow blank in forms
    )
    image = models.ImageField(upload_to='community_images/', null=True, blank=True)
    location = models.CharField(max_length=255, blank=True)
    max_members = models.PositiveIntegerField(null=True, blank=True)
    is_private = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Communities"

    def __str__(self):
        return self.name

class CommunityMembership(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='community_memberships')
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='memberships')
    joined_at = models.DateTimeField(auto_now_add=True)
    is_admin = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'community')

    def __str__(self):
        return f"{self.user.name} - {self.community.name}"

class Medicine(models.Model):
    TIME_CHOICES = [
        ('morning', 'Morning'),
        ('afternoon', 'Afternoon'),
        ('evening', 'Evening'),
        ('night', 'Night'),
    ]
    
    name = models.CharField(max_length=100)
    dosage = models.CharField(max_length=50)
    time = models.CharField(max_length=20, choices=TIME_CHOICES)
    notes = models.TextField(blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    start_date = models.DateField(default=timezone.now)
    end_date = models.DateField(null=True, blank=True)
    reminder_enabled = models.BooleanField(default=True)
    prescription_image = models.ImageField(upload_to='prescriptions/', null=True, blank=True)
    refill_reminder = models.PositiveIntegerField(help_text="Days before end to remind for refill", null=True, blank=True)
    
    def __str__(self):
        return f"{self.name} - {self.dosage} ({self.time})"

class EmergencyContact(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='emergency_contacts')
    name = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    relationship = models.CharField(max_length=100)
    is_primary = models.BooleanField(default=False)
    address = models.TextField(blank=True)
    email = models.EmailField(blank=True)

    def __str__(self):
        return f"{self.name} ({self.relationship})"

class HealthRecord(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='health_records')
    date = models.DateField()
    doctor = models.CharField(max_length=255)
    diagnosis = models.TextField()
    prescription = models.TextField(blank=True)
    followup_date = models.DateField(null=True, blank=True)
    attachments = models.FileField(upload_to='health_records/', null=True, blank=True)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.name} - {self.date} - {self.diagnosis}"

class DailyRoutine(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='routines')
    activity = models.CharField(max_length=255)
    time = models.TimeField()
    description = models.TextField(blank=True)
    is_mandatory = models.BooleanField(default=False)
    reminder_enabled = models.BooleanField(default=True)
    days = models.CharField(max_length=50, help_text="Comma-separated days: mon,tue,wed,thu,fri,sat,sun")

    def __str__(self):
        return f"{self.user.name} - {self.activity} at {self.time}"

class Appointment(models.Model):
    APPOINTMENT_TYPES = [
        ('medical', 'Medical Checkup'),
        ('therapy', 'Therapy Session'),
        ('social', 'Social Visit'),
        ('other', 'Other')
    ]
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    title = models.CharField(max_length=255)
    appointment_type = models.CharField(max_length=20, choices=APPOINTMENT_TYPES)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    reminder_before = models.PositiveIntegerField(help_text="Minutes before to send reminder", default=60)
    is_recurring = models.BooleanField(default=False)
    recurrence_pattern = models.CharField(max_length=50, blank=True, help_text="daily, weekly, monthly, etc.")

    def __str__(self):
        return f"{self.user.name} - {self.title} on {self.date_time}"

class HealthVitals(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='health_vitals')
    date_time = models.DateTimeField(auto_now_add=True)
    blood_pressure_systolic = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(300)], null=True, blank=True)
    blood_pressure_diastolic = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(200)], null=True, blank=True)
    heart_rate = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(250)], null=True, blank=True)
    temperature = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)
    blood_sugar = models.DecimalField(max_digits=5, decimal_places=1, null=True, blank=True)
    oxygen_level = models.PositiveIntegerField(validators=[MinValueValidator(0), MaxValueValidator(100)], null=True, blank=True)
    notes = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Health Vitals"

    def __str__(self):
        return f"{self.user.name} - Vitals on {self.date_time}"

class SocialActivity(models.Model):
    ACTIVITY_TYPES = [
        ('exercise', 'Exercise'),
        ('game', 'Game'),
        ('discussion', 'Discussion'),
        ('outing', 'Outing'),
        ('craft', 'Arts & Crafts'),
        ('other', 'Other')
    ]
    
    community = models.ForeignKey(Community, on_delete=models.CASCADE, related_name='activities')
    title = models.CharField(max_length=255)
    activity_type = models.CharField(max_length=20, choices=ACTIVITY_TYPES)
    description = models.TextField()
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    max_participants = models.PositiveIntegerField(null=True, blank=True)
    is_virtual = models.BooleanField(default=False)
    meeting_link = models.URLField(blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='participated_activities')

    class Meta:
        verbose_name_plural = "Social Activities"

    def __str__(self):
        return f"{self.title} - {self.date_time}"

class Event(models.Model):
    EVENT_TYPES = [
        ('community', 'Community'),
        ('wellness', 'Wellness'),
        ('education', 'Education'),
        ('social', 'Social'),
        ('family', 'Family')
    ]
    
    STATUS_CHOICES = [
        ('upcoming', 'Upcoming'),
        ('ongoing', 'Ongoing'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled')
    ]
    
    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='upcoming')
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    is_virtual = models.BooleanField(default=False)
    meeting_link = models.URLField(blank=True)
    max_participants = models.PositiveIntegerField(null=True, blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_events')
    participants = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='participated_events')
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-start_time']
        
    def __str__(self):
        return f"{self.title} - {self.start_time}"
        
    @property
    def is_upcoming(self):
        return self.start_time > timezone.now()
        
    @property
    def is_ongoing(self):
        now = timezone.now()
        return self.start_time <= now <= self.end_time
        
    @property
    def is_completed(self):
        return self.end_time < timezone.now()
        
    @property
    def participant_count(self):
        return self.participants.count()
        
    def can_join(self, user):
        if self.max_participants and self.participant_count >= self.max_participants:
            return False
        return user not in self.participants.all()
        
    def join(self, user):
        if self.can_join(user):
            self.participants.add(user)
            return True
        return False
        
    def leave(self, user):
        if user in self.participants.all():
            self.participants.remove(user)
            return True
        return False

class Journal(models.Model):
    """Model for user journal entries."""
    title = models.CharField(max_length=200)
    content = models.TextField()
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='journal_entries')
    mood = models.CharField(max_length=50, blank=True)
    tags = models.JSONField(default=list, blank=True)
    is_public = models.BooleanField(default=False)
    date_created = models.DateTimeField(auto_now_add=True)
    date_updated = models.DateTimeField(auto_now=True)
    media_urls = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['-date_created']
        indexes = [
            models.Index(fields=['user', 'date_created']),
            models.Index(fields=['title']),
        ]

    def __str__(self):
        return f"{self.title} by {self.user.email}"

    @property
    def is_recent(self):
        """Check if the entry was created in the last 24 hours."""
        return (timezone.now() - self.date_created).days < 1

    def add_tag(self, tag):
        """Add a tag to the entry if it doesn't exist."""
        if tag not in self.tags:
            self.tags.append(tag)
            self.save()

    def remove_tag(self, tag):
        """Remove a tag from the entry."""
        if tag in self.tags:
            self.tags.remove(tag)
            self.save()

    def add_media(self, url):
        """Add a media URL to the entry."""
        if url not in self.media_urls:
            self.media_urls.append(url)
            self.save()

    def remove_media(self, url):
        """Remove a media URL from the entry."""
        if url in self.media_urls:
            self.media_urls.remove(url)
            self.save()