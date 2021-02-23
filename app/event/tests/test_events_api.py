from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from datetime import datetime

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


class PriveteApiTest(TestCase):
    """Test private events API"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@testemail.com',
            'pass123123',
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_events_list(self):
        """Test retrieving a list of events"""
        Event.objects.create(user=self.user,
                             name='Birthday',
                             date_time=datetime.now()
                             .astimezone(self.user.time_zone))
        Event.objects.create(user=self.user,
                             name='Next event',
                             date_time=datetime.now()
                             .astimezone(self.user.time_zone))

        res = self.client.get(EVENTS_URL)

        events = Event.objects.all().order_by('-date_time')
        serializer = EventSerializer(events, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_events_limited_to_user(self):
        """Test that ingredients for authenticated user are returned"""
        user2 = get_user_model().objects.create_user(
            'new_user@testqwe1.ru',
            'tesst123123'
        )
        Event.objects.create(user=user2,
                             name='New user event 2',
                             date_time=datetime.now()
                             .astimezone(user2.time_zone))
        event = Event.objects.create(user=self.user,
                                     name='First user event',
                                     date_time=datetime.now()
                                     .astimezone(self.user.time_zone))

        res = self.client.get(EVENTS_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['name'], event.name)
