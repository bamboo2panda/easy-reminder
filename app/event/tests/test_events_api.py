from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Event

from event.serializers import EventSerializer


EVENTS_URL = reverse('event:event-list')


class PublicEventsApiTest(TestCase):
    """Test the publicly available events API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        res = self.client.get(EVENTS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)
