from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api_views import (
    UserViewSet, CommunityViewSet, MedicineViewSet,
    EmergencyContactViewSet, HealthRecordViewSet,
    DailyRoutineViewSet, AppointmentViewSet,
    HealthVitalsViewSet, SocialActivityViewSet,
    EventViewSet, JournalViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'communities', CommunityViewSet, basename='community')
router.register(r'medicines', MedicineViewSet, basename='medicine')
router.register(r'emergency-contacts', EmergencyContactViewSet, basename='emergency-contact')
router.register(r'health-records', HealthRecordViewSet, basename='health-record')
router.register(r'daily-routines', DailyRoutineViewSet, basename='daily-routine')
router.register(r'appointments', AppointmentViewSet, basename='appointment')
router.register(r'health-vitals', HealthVitalsViewSet, basename='health-vital')
router.register(r'social-activities', SocialActivityViewSet, basename='social-activity')
router.register(r'events', EventViewSet, basename='event')
router.register(r'journals', JournalViewSet, basename='journal')

urlpatterns = [
    path('api/', include(router.urls)),
    # Removed duplicate rest_framework.urls include as it's already in core/urls.py
]
