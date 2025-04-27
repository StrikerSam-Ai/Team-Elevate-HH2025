from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Community, CommunityMembership, Medicine

@admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'name', 'is_staff')
    search_fields = ('email', 'name')
    ordering = ('email',)
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('name', 'birth_date', 'phone', 'city')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

@admin.register(Community)
class CommunityAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_by', 'created_at')
    search_fields = ('name', 'description')
    list_filter = ('created_at',)

@admin.register(CommunityMembership)
class CommunityMembershipAdmin(admin.ModelAdmin):
    list_display = ('user', 'community', 'joined_at', 'is_admin')
    list_filter = ('is_admin', 'joined_at')
    search_fields = ('user__email', 'community__name')

@admin.register(Medicine)
class MedicineAdmin(admin.ModelAdmin):
    list_display = ('name', 'dosage', 'time')
    list_filter = ('time', 'user')
    search_fields = ('name', 'user__email')
    raw_id_fields = ('user',)