from rest_framework import serializers
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.contrib.auth import get_user_model


from rest_framework import serializers

from ..models import (
    VERIFICATION_KEY_LENGTH,
    create_verification_key,
    send_verification_email,
)


UserAccount = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserAccount
        fields = (
            "id",
            "username",
            "password",
            "email",
            "first_name",
            "last_name",
            "address",
            "zip_and_city",
            "phone",
            "accepted_tos",
            "accepted_privacy_policy",
        )

    def create(self, validated_data):
        user = UserAccount.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_active=False,  # inactive until email is verified
            phone=validated_data['phone'],
            zip_and_city=validated_data['zip_and_city'],
            address=validated_data['address'],
            accepted_tos=validated_data['accepted_tos'],
            accepted_privacy_policy=validated_data['accepted_privacy_policy'],
            verified=False,
            verification_key=create_verification_key(),
        )
        user.set_password(validated_data['password'])
        user.save()

        Token.objects.create(user=user)
        send_verification_email(user)

        return user


class VerifySerializer(serializers.Serializer):
    user_id = serializers.IntegerField(required=True)
    verification_key = serializers.CharField(
        max_length=VERIFICATION_KEY_LENGTH, required=True
    )

    def validate(self, attrs):
        """Check for correct user ID and verification_key."""
        try:
            user = UserAccount.objects.get(pk=attrs['user_id'])
        except UserAccount.DoesNotExist:
            raise serializers.ValidationError("User does not exist")
        if user.verification_key != attrs['verification_key']:
            raise serializers.ValidationError("Incorrect verification key!")
        self.instance = user
        return attrs
