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
import speech_recognition as sr


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
        start_x = request.data['start_point_latitude']
        start_y = request.data['start_point_longitude']
        end_x = request.data['end_point_latitude']
        end_y =  request.data['end_point_longitude']

        print(start_x)
        r = requests.post("https://apis.openapi.sk.com/tmap/routes?version=1&format=json&callback=result", 
        data={
            "appKey" : "l7xxc5a68ad4f4694ce69401820ade2405ea",
			"startX" : str(start_x),
		    "startY" : str(start_y),
		    "endX" : str(end_x),
		    "endY" : str(end_y),
            # "startX" : "126.9850380932383",
		    # "startY" : "37.566567545861645",
		    # "endX" : "127.10331814639885",
		    # "endY" : "37.403049076341794",
		    "reqCoordType" : "WGS84GEO",
		    "resCoordType" : "EPSG3857",
        })
        print(r)

        taxi_api_json = r.json()
        # print(taxi_api_json)
        expected_texi_fare = taxi_api_json['features'][0]['properties']['taxiFare']
        print(expected_texi_fare)
        request.data['expected_texi_fare'] = expected_texi_fare
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
        print(r)
        # print(taxi_api_json)
        expected_texi_fare = taxi_api_json['features'][0]['properties']['taxiFare']
        print(expected_texi_fare)
        return Response(status=status.HTTP_200_OK)


class SttAPI(APIView):
    authentication_classes = [TokenAuthentication]   #이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = []  
    def recognize_speech_from_mic(self, recognizer, microphone):
        """Transcribe speech from recorded from `microphone`.
        Returns a dictionary with three keys:
        "success": a boolean indicating whether or not the API request was
                successful
        "error":   `None` if no error occured, otherwise a string containing
                an error message if the API could not be reached or
                speech was unrecognizable
        "transcription": `None` if speech could not be transcribed,
                otherwise a string containing the transcribed text
        """
        # check that recognizer and microphone arguments are appropriate type
        if not isinstance(recognizer, sr.Recognizer):
            raise TypeError("`recognizer` must be `Recognizer` instance")

        if not isinstance(microphone, sr.Microphone):
            raise TypeError("`microphone` must be `Microphone` instance")

        # adjust the recognizer sensitivity to ambient noise and record audio
        # from the microphone
        with microphone as source:
            recognizer.adjust_for_ambient_noise(source, duration=1) # #  analyze the audio source for 1 second
            audio = recognizer.listen(source)

        # set up the response object
        response = {
            "success": True,
            "error": None,
            "transcription": None
        }

        # try recognizing the speech in the recording
        # if a RequestError or UnknownValueError exception is caught,
        #   update the response object accordingly
        try:
            response["transcription"] = recognizer.recognize_google(audio, language='ko-KR')
        except sr.RequestError:
            # API was unreachable or unresponsive
            response["success"] = False
            response["error"] = "API unavailable/unresponsive"
        except sr.UnknownValueError:
            # speech was unintelligible
            response["error"] = "Unable to recognize speech"

        return response

    @action(methods=['GET'], detail=False)
    def get(self, request):

        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY, algorithms=['HS256'])

        recognizer = sr.Recognizer() 
        mic = sr.Microphone(device_index=1) 
        recognizer.energy_threshold = 1200
        recognizer.dynamic_energy_adjustment_ratio = 1.5

        recognizer.pause_threshold = 0.8
        response = self.recognize_speech_from_mic(recognizer, mic) 
        print('\nSuccess : {}\nError   : {}\n\nText from Speech\n{}\n\n{}' \
            .format(response['success'],
                    response['error'],
                    '-'*17,
                    response['transcription']))
        response_data = {
            "requirement_information":response['transcription']
        }
        
        return Response(response_data, status=status.HTTP_200_OK)

