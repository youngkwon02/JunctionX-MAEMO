from django.urls import path
from reservation.views import ReservationAPI

urlpatterns = [
    path('', ReservationAPI.as_view()),
]