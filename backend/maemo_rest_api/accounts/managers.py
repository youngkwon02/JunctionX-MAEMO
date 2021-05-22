from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, name, phone, password=None):
        if not name:
            raise ValueError('Users must have a name')

        user = self.model(
            name=name,
            phone=phone,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, phone, password):
        user = self.create_user(
            name=name,
            phone=phone,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user