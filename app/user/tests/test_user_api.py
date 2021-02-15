from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status


CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


def create_user(**params):
    return get_user_model().objects.create_user(**params)


class PublicUserApiTests(TestCase):
    """Test the user API (public)"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'email': 'test@123.ro',
            'password': '123asd123123',
            'name': 'Test Name',
            'time_zone': 'Europe/London'
        }

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(res.data['time_zone'], payload['time_zone'])

    def test_user_exists(self):
        """Test creating a user thet already exists fails"""
        payload = {
            'email': 'test@123.ru',
            'password': '123PassW0rd',
            'name': 'Test Name'
        }
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEquals(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test the password must be more than 5 characters"""
        payload = {
            'email': 'rest@eamil.com',
            'password': 'pw',
            'name': 'test Name'
        }

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEquals(res.status_code, status.HTTP_400_BAD_REQUEST)
