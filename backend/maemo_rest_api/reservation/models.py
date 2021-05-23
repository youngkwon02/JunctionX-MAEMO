from django.db import models
from accounts.models import User

class Reservation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(null=True, blank=True)
    is_am = models.BooleanField(default=True)
    start_point_latitude = models.CharField(max_length=12, blank=True)
    start_point_longitude = models.CharField(max_length=12, blank=True)
    end_point_latitude = models.CharField(max_length=12, blank=True)
    end_point_longitude = models.CharField(max_length=12, blank=True)
    requirement_information = models.CharField(max_length=200, blank=True)
    is_reservation_finished = models.BooleanField(default=False)
    expected_texi_fare = models.CharField(max_length=12, blank=True)
    actual_texi_fare = models.CharField(max_length=12, blank=True, null=True)
    start_point = models.CharField(max_length=30, blank=True, null=True)
    end_point = models.CharField(max_length=30, blank=True, null=True)


    def __str__(self):
        return self.user.name

    def get_user_name(self):
        return self.user.name