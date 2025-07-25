from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Community, CommunityMembership, Medicine, EmergencyContact,
    HealthRecord, DailyRoutine, Appointment, HealthVitals,
    SocialActivity, Event, Journal
)

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id', 'email', 'name', 'birth_date', 'phone', 'city',
            'emergency_contact_name', 'emergency_contact_phone',
            'emergency_contact_relationship', 'medical_conditions',
            'allergies', 'blood_group', 'preferred_hospital',
            'insurance_info', 'bio', 'profile_picture', 'date_joined',
            'last_login', 'email_notifications', 'push_notifications',
            'theme_preference'
        )
        read_only_fields = ('id', 'date_joined', 'last_login')

class CommunitySerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    member_count = serializers.SerializerMethodField()

    class Meta:
        model = Community
        fields = (
            'id', 'name', 'description', 'created_by', 'created_at',
            'updated_at', 'category', 'image', 'location', 'max_members',
            'is_private', 'member_count'
        )
        read_only_fields = ('id', 'created_at', 'updated_at')

    def get_member_count(self, obj):
        return obj.memberships.count()

class CommunityMembershipSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    community = CommunitySerializer(read_only=True)

    class Meta:
        model = CommunityMembership
        fields = ('id', 'user', 'community', 'joined_at', 'is_admin')
        read_only_fields = ('id', 'joined_at')

class MedicineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Medicine
        fields = (
            'id', 'name', 'dosage', 'time', 'notes', 'start_date',
            'end_date', 'reminder_enabled', 'prescription_image',
            'refill_reminder'
        )

class EmergencyContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyContact
        fields = (
            'id', 'name', 'phone', 'relationship', 'is_primary',
            'address', 'email'
        )

class HealthRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthRecord
        fields = (
            'id', 'date', 'doctor', 'diagnosis', 'prescription',
            'followup_date', 'attachments', 'notes'
        )

class DailyRoutineSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyRoutine
        fields = (
            'id', 'activity', 'time', 'description', 'is_mandatory',
            'reminder_enabled', 'days'
        )

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = (
            'id', 'title', 'appointment_type', 'date_time', 'location',
            'description', 'reminder_before', 'is_recurring',
            'recurrence_pattern'
        )

class HealthVitalsSerializer(serializers.ModelSerializer):
    class Meta:
        model = HealthVitals
        fields = (
            'id', 'date_time', 'blood_pressure_systolic',
            'blood_pressure_diastolic', 'heart_rate', 'temperature',
            'blood_sugar', 'oxygen_level', 'notes'
        )
        read_only_fields = ('id', 'date_time')

class SocialActivitySerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    participant_count = serializers.SerializerMethodField()

    class Meta:
        model = SocialActivity
        fields = (
            'id', 'community', 'title', 'activity_type', 'description',
            'date_time', 'location', 'max_participants', 'is_virtual',
            'meeting_link', 'created_by', 'participants', 'participant_count'
        )

    def get_participant_count(self, obj):
        return obj.participants.count()

class EventSerializer(serializers.ModelSerializer):
    created_by = UserSerializer(read_only=True)
    participants = UserSerializer(many=True, read_only=True)
    participant_count = serializers.SerializerMethodField()
    status = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = (
            'id', 'title', 'description', 'event_type', 'status',
            'start_time', 'end_time', 'location', 'is_virtual',
            'meeting_link', 'max_participants', 'created_by',
            'participants', 'participant_count', 'date_created',
            'date_updated'
        )
        read_only_fields = ('id', 'date_created', 'date_updated')

    def get_participant_count(self, obj):
        return obj.participant_count

    def get_status(self, obj):
        if obj.is_upcoming:
            return 'upcoming'
        elif obj.is_ongoing:
            return 'ongoing'
        elif obj.is_completed:
            return 'completed'
        return obj.status

class JournalSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    is_recent = serializers.BooleanField(read_only=True)

    class Meta:
        model = Journal
        fields = (
            'id', 'title', 'content', 'user', 'mood', 'tags',
            'is_public', 'date_created', 'date_updated', 'media_urls',
            'is_recent'
        )
        read_only_fields = ('id', 'date_created', 'date_updated') 