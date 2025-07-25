from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import (
    CustomUser, Community, CommunityMembership, Medicine,
    EmergencyContact, HealthRecord, DailyRoutine, Appointment,
    HealthVitals, SocialActivity, Event, Journal
)
from .serializers import (
    UserSerializer, CommunitySerializer, CommunityMembershipSerializer,
    MedicineSerializer, EmergencyContactSerializer, HealthRecordSerializer,
    DailyRoutineSerializer, AppointmentSerializer, HealthVitalsSerializer,
    SocialActivitySerializer, EventSerializer, JournalSerializer
)

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CustomUser.objects.filter(id=self.request.user.id)

    @action(detail=False, methods=['get'])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def update_profile(self, request):
        serializer = self.get_serializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommunityViewSet(viewsets.ModelViewSet):
    queryset = Community.objects.all()
    serializer_class = CommunitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        community = self.get_object()
        if community.is_private:
            return Response(
                {"error": "This community is private"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        membership, created = CommunityMembership.objects.get_or_create(
            user=request.user,
            community=community
        )
        serializer = CommunityMembershipSerializer(membership)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        community = self.get_object()
        membership = get_object_or_404(
            CommunityMembership,
            user=request.user,
            community=community
        )
        membership.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class MedicineViewSet(viewsets.ModelViewSet):
    serializer_class = MedicineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Medicine.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EmergencyContactViewSet(viewsets.ModelViewSet):
    serializer_class = EmergencyContactSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return EmergencyContact.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HealthRecordViewSet(viewsets.ModelViewSet):
    serializer_class = HealthRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthRecord.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class DailyRoutineViewSet(viewsets.ModelViewSet):
    serializer_class = DailyRoutineSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return DailyRoutine.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class HealthVitalsViewSet(viewsets.ModelViewSet):
    serializer_class = HealthVitalsSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return HealthVitals.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class SocialActivityViewSet(viewsets.ModelViewSet):
    queryset = SocialActivity.objects.all()
    serializer_class = SocialActivitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        activity = self.get_object()
        if activity.max_participants and activity.participants.count() >= activity.max_participants:
            return Response(
                {"error": "Activity is full"},
                status=status.HTTP_400_BAD_REQUEST
            )
        activity.participants.add(request.user)
        return Response(status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        activity = self.get_object()
        activity.participants.remove(request.user)
        return Response(status=status.HTTP_200_OK)

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def join(self, request, pk=None):
        event = self.get_object()
        if event.can_join(request.user):
            event.join(request.user)
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"error": "Cannot join event"},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def leave(self, request, pk=None):
        event = self.get_object()
        if event.leave(request.user):
            return Response(status=status.HTTP_200_OK)
        return Response(
            {"error": "Not participating in event"},
            status=status.HTTP_400_BAD_REQUEST
        )

class JournalViewSet(viewsets.ModelViewSet):
    serializer_class = JournalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Journal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def add_tag(self, request, pk=None):
        journal = self.get_object()
        tag = request.data.get('tag')
        if tag:
            journal.add_tag(tag)
            return Response(self.get_serializer(journal).data)
        return Response(
            {"error": "Tag is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def remove_tag(self, request, pk=None):
        journal = self.get_object()
        tag = request.data.get('tag')
        if tag:
            journal.remove_tag(tag)
            return Response(self.get_serializer(journal).data)
        return Response(
            {"error": "Tag is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def add_media(self, request, pk=None):
        journal = self.get_object()
        url = request.data.get('url')
        if url:
            journal.add_media(url)
            return Response(self.get_serializer(journal).data)
        return Response(
            {"error": "URL is required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    @action(detail=True, methods=['post'])
    def remove_media(self, request, pk=None):
        journal = self.get_object()
        url = request.data.get('url')
        if url:
            journal.remove_media(url)
            return Response(self.get_serializer(journal).data)
        return Response(
            {"error": "URL is required"},
            status=status.HTTP_400_BAD_REQUEST
        ) 