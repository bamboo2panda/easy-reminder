from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.conf.urls import url

from event import views

router = DefaultRouter()
router.register('events', views.EventViewSet)

app_name = 'event'

urlpatterns = [
    path('', include(router.urls)),
]
