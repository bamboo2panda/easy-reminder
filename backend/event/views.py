from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Event
from event import serializers


class BaseEventViewSet(viewsets.GenericViewSet,
                       mixins.ListModelMixin,
                       mixins.CreateModelMixin):
    """Base viewset for user owned events"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for current authenticated user only"""
        assigned_only = bool(
            int(self.request.query_params.get('assigned_only', 0))
        )
        queryset = self.queryset
        if assigned_only:
            queryset = queryset.filter(event__isnull=False)

        return queryset.filter(
            user=self.request.user
        ).order_by('-date_time').distinct()

    def perform_create(self, serializer):
        """Create new object"""
        serializer.save(user=self.request.user)


class EventViewSet(BaseEventViewSet):

    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )
