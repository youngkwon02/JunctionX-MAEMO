from accounts.models import User, Profile
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'phone', "user_type", "challenged_type", "protector_type", "protector_phone")


class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    phone = serializers.CharField(write_only=True)
    user_type = serializers.ChoiceField(choices=User.USER_TYPES, help_text='회원가입 타입')
    challenged_type = serializers.CharField(required=False)
    protector_type = serializers.CharField(required=False)
    protector_phone = serializers.CharField(required=False)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        # phone = validated_data.pop('phone', None)
        instance = self.Meta.model(**validated_data)
        # if phone is not None:
        #     instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = (
            'name', 
            'phone',
            'token',
            'user_type',
            'challenged_type',
            'protector_type',
            'protector_phone'
            )


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
            'name', 
            'user_type', 
            'challenged_type', 
            'protector_type', 
            'protector_phone'
            ) 
