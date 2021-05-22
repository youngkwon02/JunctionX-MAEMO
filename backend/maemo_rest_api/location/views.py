from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from location.notification import client
import jwt
from maemo_rest_api import settings
from accounts.models import User
from accounts.serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
import requests
from location.location_coordinate import location_coordinate
from reservation.models import Reservation


class NotificationAPI(APIView):
    authentication_classes = [TokenAuthentication]   #이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = [] 

    @action(methods=['POST'], detail=False)
    def post(self, request):

        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY,
                            algorithms=['HS256'])

        target_user = User.objects.get(id=auth['user_id'])
        parsed_phone_number = target_user.protector_phone
        parsing_phone_number = '+82'+str(''.join(parsed_phone_number.split('-')))
        phone = parsing_phone_number[0:3] + parsing_phone_number[4:]
        print(phone)

        client.publish(
            PhoneNumber= phone, 
            Message='예상 경로의 반경을 2km 이상 이탈했습니다. 보호자께서는 오지영님의 상황을 확인해주세요! 장시간 동안 연락이 되지 않는다면 긴급신고 112로 전화 부탁드립니다.'
        )
        return Response(status.HTTP_200_OK)


class LocationAPI(APIView):
    TAXI_DISTANCE_PER_100 = 132
    TAXI_FARE_NUMBER = 100
    TAXI_BASIC_DISTANCE = 2000
    TAXI_BASIC_FARE = 3800

    authentication_classes = [TokenAuthentication]   #이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = [] 

    def is_profit(self, actual_fare, expected_fare):
        if actual_fare >= expected_fare:
            return False
        else:
            return True
    
    def get_taxi_fare_algorithm(self, distance):
        if distance < LocationAPI.TAXI_BASIC_DISTANCE:
            return LocationAPI.TAXI_BASIC_FARE
        else:
            return int(LocationAPI.TAXI_BASIC_FARE + (distance-LocationAPI.TAXI_BASIC_DISTANCE) // LocationAPI.TAXI_DISTANCE_PER_100 * LocationAPI.TAXI_FARE_NUMBER)

    @action(methods=['GET'], detail=False)
    def get(self, request):
        total_distance = 0
        for index in range(len(location_coordinate)-1):
            r = requests.post("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
            data={
                "appKey" : "l7xxc5a68ad4f4694ce69401820ade2405ea",
                "startX" : str(location_coordinate[index]['y']),
                "startY" : str(location_coordinate[index]['x']),
                "endX" : str(location_coordinate[index+1]['y']),
                "endY" : str(location_coordinate[index+1]['x']),
                "reqCoordType" : "WGS84GEO",
                "resCoordType" : "EPSG3857",
            })
            location_api_json = r.json()
            # print(location_api_json)
            actual_texi_distance = location_api_json['features'][0]['properties']['totalDistance']
            total_distance += actual_texi_distance
        actual_taxi_fare = self.get_taxi_fare_algorithm(total_distance)
        
        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY,
                            algorithms=['HS256'])

        target_user = User.objects.get(id=auth['user_id'])
        reservation_data = Reservation.objects.filter(user=target_user).last()
        expected_fare = int(reservation_data.expected_texi_fare)
        fare_difference = actual_taxi_fare - expected_fare
        reservation_data.actual_taxi_fare = actual_taxi_fare
        reservation_data.save()

        print(actual_taxi_fare)
        print(reservation_data.expected_texi_fare)


        response_data = {
            "fare_difference": fare_difference,
            "is_profit" : self.is_profit(actual_taxi_fare, expected_fare),
            "actual_taxi_fare": actual_taxi_fare,
            "expected_fare": expected_fare
        }
        return Response(response_data, status.HTTP_200_OK)