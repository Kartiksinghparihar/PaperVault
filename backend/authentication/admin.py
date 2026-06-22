from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    model = User

    list_display = ('login_id', 'email', 'name', 'role', 'is_staff')
    search_fields = ('login_id', 'email', 'name')
    ordering = ('login_id',)

    fieldsets = (
        (None, {'fields': ('login_id', 'password')}),
        ('Personal info', {
            'fields': ('name', 'email', 'branch', 'semester', 'points')
        }),
        ('Permissions', {
            'fields': (
                'is_active',
                'is_staff',
                'is_superuser',
                'groups',
                'user_permissions'
            )
        }),
        ('Role', {'fields': ('role',)}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'login_id',
                'email',
                'name',
                'password1',
                'password2',
                'role',
                'is_staff',
                'is_superuser',
            ),
        }),
    )