from django.contrib import admin
from .models import CustomUser, Student, Teacher
from django.contrib.auth.admin import UserAdmin


class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active', 'role', 'bio','date_joined')
    list_filter = ('is_staff', 'is_active', 'role')
    search_fields = ('username', 'email')
    ordering = ('date_joined',)

    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Role Info', {'fields': ('role',)}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )


class StudentAdmin(CustomUserAdmin):
    list_display = ('username', 'email', 'is_active', 'date_joined')


class TeacherAdmin(CustomUserAdmin):
    list_display = ('username', 'email', 'institution','role', 'is_active', 'date_joined')
    fieldsets = CustomUserAdmin.fieldsets + (
        ('Teacher Info', {'fields': ('institution', 'bio')}),
    )


# Register models in the admin site
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Student, StudentAdmin)
admin.site.register(Teacher, TeacherAdmin)
