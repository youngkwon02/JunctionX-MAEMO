from django.contrib import admin
from . import models

from django.contrib.auth.admin import UserAdmin
from .models import User, Profile


class UserAdmin(admin.ModelAdmin):
    list_display = [
        'name', 
        'phone', 
        'user_type', 
        'challenged_type', 
        'protector_type',
        'protector_phone'
        ]

    fieldsets = (
        (None, {'fields':('name', 'phone',)}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Profile)