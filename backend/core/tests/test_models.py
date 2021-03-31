import pytz
from datetime import datetime
from django.test import TestCase
from django.contrib.auth import get_user_model

from core import models


def get_test_user(email='test@email.com',
                  password='testpassword',
                  name='Test Name',
                  time_zone='Europe/Moscow'):
    user = get_user_model().objects.create_user(
        email=email,
        password=password,
        name=name,
        time_zone=time_zone
    )

    return user


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test@email.ru'
        password = 'testpassword'
        user = get_user_model().objects.create_user(
            email=email,
            password=password
        )
        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email of a new user is normalized"""
        email = 'test@EMAIL.com'
        user = get_test_user(email=email)

        self.assertEquals(user.email, email.lower())

    def test_new_user_time_zone_field_is_required(self):
        """Test time zome field is required"""
        time_zone = 'Turkey'
        user = get_test_user(time_zone=time_zone)

        self.assertEquals(user.time_zone, time_zone)

    def test_new_user_invalid_time_zone_field(self):
        """Test if new user has invalid time zone field format"""
        time_zone = ''
        user = get_test_user(time_zone=time_zone)

        self.assertEquals(user.time_zone, pytz.timezone('Europe/Moscow'))

    def test_create_new_superuser(self):
        """Test creating new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@123.ru',
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_new_event_str(self):
        """Test event string representation"""
        current_user = get_test_user()
        event = models.Event.objects.create(
            user=current_user,
            name='Jain`s birthday party',
            date_time=datetime(
                               2021, 2, 1, 14, 0, 0, 0,
                               pytz.timezone(current_user.time_zone)
                               )
        )

        self.assertEquals(str(event), event.name)

    def test_new_event_time_zone(self):
        """Test event time zone is correct"""
        current_user = get_test_user()
        cu_tz = pytz.timezone(current_user.time_zone)
        event = models.Event.objects.create(
            user=current_user,
            name='New test Event',
            date_time=cu_tz.localize(
                            datetime(2021, 3, 3, 13, 25, 0, 0), is_dst=None
                        ).astimezone(pytz.utc)
        )

        self.assertEqual(
                         event.date_time,
                         pytz.timezone('Europe/Moscow')
                         .localize(datetime(2021, 3, 3, 13, 25, 0, 0))
                        )
        self.assertEquals(event.date_time.tzinfo, pytz.utc)
