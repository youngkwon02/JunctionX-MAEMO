from django.contrib import admin
from . import models

from django.contrib.auth.admin import UserAdmin
from .models import User, Profile


class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone']

    fieldsets = (
        (None, {'fields':('name', 'phone',)}),
    )

admin.site.register(User, UserAdmin)
admin.site.register(Profile)