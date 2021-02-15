from django.contrib.auth import get_user_model, authenticate
from django.utils.translation import ugettext_lazy as _
from rest_framework import serializers

from timezone_field.rest_framework import TimeZoneSerializerField


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user object"""
    time_zone = TimeZoneSerializerField()

    class Meta:
        model = get_user_model()
        fields = ('email', 'password', 'name', 'time_zone')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        return get_user_model().objects.create_user(**validated_data)


class AuthTokenSerializer(serializers.Serializer):
    pass
