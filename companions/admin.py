from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Community, CommunityMembership

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'username', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'username', 'first_name', 'last_name')
    ordering = ('email',)

@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)

@admin.register(CommunityMembership)
class CommunityMembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'community', 'joined_at', 'is_admin')
    search_fields = ('user__email', 'community__name')
    list_filter = ('is_admin', 'joined_at')