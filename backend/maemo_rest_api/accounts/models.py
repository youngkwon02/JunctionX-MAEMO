from django.db import models
from django.conf import settings
from django.contrib.auth.models import  (AbstractBaseUser, PermissionsMixin)
from accounts.managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):

    NONE = 'none'
    CHALLENGED = 'challenged'
    INFANT_COMPANION = 'infant_companion'
    PREGNANT = 'pregnant'
    CHILD = 'child'
    OLD = 'old'

    FAMILY = 'family'
    SIBLING = 'sibling'
    RELATIVE = 'relative'
    FRIEND = 'friend'
    LOVER = 'lover'
    ETC = 'etc'

    USER_TYPES = [
        (NONE, 'NONE'),
        (CHALLENGED, 'CHALLENGED'),
        (PREGNANT, 'PREGNANT'),
        (INFANT_COMPANION, 'INFANT_COMPANION'),
        (CHILD, 'CHILD'),
        (OLD, 'OLD')
    ]

    PROTECTOR_TYPES = [
        (NONE, 'NONE'),
        (FAMILY, 'FAMILY'),
        (SIBLING, 'SIBLING'),
        (RELATIVE, 'RELATIVE'),
        (FRIEND, 'FRIEND'),
        (LOVER, 'LOVER'),
        (ETC, 'ETC')
    ]

    name = models.CharField(
        verbose_name='name',
        max_length=12,
        unique=True,
    )
    
    phone = models.CharField(
        verbose_name='phone',
        max_length=12,
        unique=True,
    )
    
    user_type = models.CharField(max_length=20, choices=USER_TYPES, default=NONE, blank=True, help_text='유저 타입')
    challenged_type = models.CharField(max_length=50, blank=True)
    protector_type = models.CharField(max_length=20, blank=True, help_text='보호자 타입')
    protector_phone = models.CharField(max_length=12, blank=True)

    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'name'
    REQUIRED_FIELDS = ['phone',]

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Profile(models.Model):

    NONE = 'none'
    CHALLENGED = 'challenged'
    INFANT_COMPANION = 'infant_companion'
    PREGNANT = 'pregnant'
    CHILD = 'child'

    FAMILY = 'family'
    SIBLING = 'sibling'
    RELATIVE = 'relative'
    FRIEND = 'friend'
    LOVER = 'lover'
    ETC = 'etc'

    USER_TYPES = [
        (NONE, 'NONE'),
        (CHALLENGED, 'CHALLENGED'),
        (PREGNANT, 'PREGNANT'),
        (INFANT_COMPANION, 'INFANT_COMPANION'),
        (CHILD, 'CHILD'),
    ]

    PROTECTOR_TYPES = [
        (NONE, 'NONE'),
        (FAMILY, 'FAMILY'),
        (SIBLING, 'SIBLING'),
        (RELATIVE, 'RELATIVE'),
        (FRIEND, 'FRIEND'),
        (LOVER, 'LOVER'),
        (ETC, 'ETC')
    ]

    name = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name='User'
    )

    user_type = models.CharField(max_length=20, choices=USER_TYPES, default=NONE, blank=True, help_text='유저 타입')
    challenged_type = models.CharField(max_length=50, blank=True)
    protector_type = models.CharField(max_length=20, choices=PROTECTOR_TYPES, default=NONE, blank=True, help_text='보호자 타입')
    protector_phone = models.CharField(max_length=12, blank=True)

    def __str__(self):
        return str(self.name)
