from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import action
from reservation.models import Reservation
from reservation.serializers import ReservationSerializer
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from accounts.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
import jwt
from maemo_rest_api import settings
import requests
from reservation.serializers import ReservationCreateSerializer


class ReservationAPI(APIView):
    authentication_classes = [TokenAuthentication]   #이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    @action(methods=['GET'], detail=False)
    def get(self, request):
        # user1 =  self.context['request'].user
        # print(user1)
        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

        user_instance = User.objects.get(id=auth['user_id'])

        target_reservations = Reservation.objects.filter(user=user_instance)
        serializer_data = ReservationSerializer(target_reservations, many=True)
        return Response(serializer_data.data, status=status.HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def post(self, request):

        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

        user_instance = User.objects.get(id=auth['user_id'])
        reservation = Reservation.objects.create(user=user_instance)
        print(request.data)
        serializer_data = ReservationCreateSerializer(reservation, data=request.data)
        serializer_data.is_valid(raise_exception=True)
        serializer_data.save()
        print(serializer_data.data)
        return Response(data=serializer_data.data, status=status.HTTP_200_OK)

class TaxiAPI(APIView):
    authentication_classes = [TokenAuthentication]   #이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = []       #만듬 settings.py에서도 아마 가능할 것 같음.

    @action(methods=['GET'], detail=False)
    def get(self, request):

        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

        r = requests.post("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
        data={
            "appKey" : "l7xxc5a68ad4f4694ce69401820ade2405ea",
			"startX" : "126.9850380932383",
		    "startY" : "37.566567545861645",
		    "endX" : "127.10331814639885",
		    "endY" : "37.403049076341794",
		    "reqCoordType" : "WGS84GEO",
		    "resCoordType" : "EPSG3857",
        })
        taxi_api_json = r.json()
        # print(taxi_api_json)
        expected_texi_fare = taxi_api_json['features'][0]['properties']['taxiFare']
        print(expected_texi_fare)
        return Response(status=status.HTTP_200_OK)