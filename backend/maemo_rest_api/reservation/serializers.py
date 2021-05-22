from rest_framework import serializers
from reservation.models import Reservation


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
            'is_reservation_finished'
        )
