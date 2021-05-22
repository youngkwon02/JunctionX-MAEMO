from rest_framework import serializers
from reservation.models import Reservation
from accounts.serializers import UserSerializer

class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = (
            'user',
            'date',
            'is_am',
            'start_point_latitude',
            'start_point_longitude',
            'end_point_latitude',
            'end_point_longitude',
            'is_reservation_finished',
            'expected_texi_fare',
            'actual_texi_fare',
            'start_point',
            'end_point'
        )


class ReservationCreateSerializer(serializers.ModelSerializer):
    date = serializers.DateTimeField(required=False)
    is_am = serializers.BooleanField(required=False)
    start_point_latitude = serializers.CharField(required=False)
    start_point_longitude = serializers.CharField(required=False)
    end_point_latitude = serializers.CharField(required=False)
    end_point_longitude = serializers.CharField(required=False)
    requirement_information = serializers.CharField(required=False)
    is_reservation_finished = serializers.BooleanField(required=False)
    expected_texi_fare = serializers.CharField(required=False)
    actual_texi_fare = serializers.CharField(required=False)
    start_point = serializers.CharField(required=False)
    end_point = serializers.CharField(required=False)

    class Meta:
        model = Reservation
        fields = (
            'date',
            'is_am',
            'start_point_latitude',
            'start_point_longitude',
            'end_point_latitude',
            'end_point_longitude',
            'is_reservation_finished',
            'expected_texi_fare',
            'actual_texi_fare',
            'start_point',
            'end_point',
            'requirement_information'
        )

    def update(self, guestbook, validated_data):
        print(validated_data)
        return super().update(guestbook, validated_data)

    