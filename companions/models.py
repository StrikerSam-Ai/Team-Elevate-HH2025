from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone

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