from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin
from timezone_field import TimeZoneField


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves new user"""
        if not email:
            raise ValueError('User must have an email adress.')
        if 'time_zone' in extra_fields and not extra_fields['time_zone']:
            extra_fields.pop('time_zone', None)
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    time_zone = TimeZoneField(default='Europe/Moscow',
                              choices_display='WITH_GMT_OFFSET')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    USERNAME_FIELD = 'email'

class Event(models.Model):
    """Event object"""
    name = models.CharField(max_length=255, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True
    )
    date_time = models.DateTimeField(null=True)

    def __str__(self):
        return self.name
    

