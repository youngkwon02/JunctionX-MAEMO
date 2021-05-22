from django.contrib import admin
from reservation.models import Reservation


class ReservationAdmin(admin.ModelAdmin):
    list_display = [
        'user', 
        'date', 
        'is_am', 
        'start_point_latitude', 
        'start_point_longitude',
        'end_point_latitude',
        'end_point_longitude',
        'is_reservation_finished'
        ]


admin.site.register(Reservation)
