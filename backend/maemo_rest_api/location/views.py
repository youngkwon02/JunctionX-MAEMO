from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from location.notification import NotificationClient
import jwt
from maemo_rest_api import settings
from accounts.models import User
from accounts.serializers import UserSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication


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

        serializer_data = UserSerializer(target_user)
        notification_client = NotificationClient()
        notification_client.publish_message(phone_number='+8201075485351', message='test')
        return Response(status.HTTP_200_OK)
