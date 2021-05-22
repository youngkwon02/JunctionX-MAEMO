from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(
        self, 
        name, 
        phone, 
        user_type, 
        challenged_type, 
        protector_type, 
        protector_phone,
        password=None
    ):
        if not name:
            raise ValueError('Users must have a name')

        user = self.model(
            name=name,
            phone=phone,
            user_type=user_type,
            challenged_type=challenged_type,
            protector_type=protector_type,
            protector_phone=protector_phone
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