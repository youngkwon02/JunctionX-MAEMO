from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token, verify_jwt_token, refresh_jwt_token
from maemo_rest_api.global_utils.jwt_token import validate_jwt_token
from location.views import NotificationAPI, LocationAPI
from reservation.views import TaxiAPI


urlpatterns = [
    path('admin/', admin.site.urls),
    path('validate/', validate_jwt_token),
    path('login/', obtain_jwt_token),

    path('verify/', verify_jwt_token),
    path('refresh/', refresh_jwt_token),
    path('user', include('accounts.urls')),
    path('reservation', include('reservation.urls')),
    path('notification', NotificationAPI.as_view()),
    path('location', LocationAPI.as_view()),
    path('taxi', TaxiAPI.as_view())
]
