from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.serializers import UserSerializer, UserSerializerWithToken, ProfileSerializer
from rest_framework import permissions, status, generics
from accounts.models import User, Profile
from rest_framework.decorators import action
import jwt
from maemo_rest_api import settings


@api_view(['GET'])
def current_user(request):
    print(request)
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    @action(methods=['POST'], detail=False)
    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=False)
    def get(self, request, format=None):
        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY,
                          algorithms=['HS256'])

        target_user = User.objects.get(id=auth['user_id'])

        serializer_data = UserSerializer(target_user)
        return Response(serializer_data.data, status=status.HTTP_200_OK)


class UserAPI(APIView):
    authentication_classes = []  # 이거 두줄은 권한이 없는 상태에서 데이터 요청을 가능하게
    permission_classes = []  # 만듬 settings.py에서도 아마 가능할 것 같음.

    @action(methods=['GET'], detail=False)
    def get(self, request):
        token = request.META['HTTP_AUTHORIZATION']
        print(token)
        token = token[7:]
        auth = jwt.decode(jwt=token, key=settings.SECRET_KEY,
                          algorithms=['HS256'])

        target_user = User.objects.get(id=auth['user_id'])

        serializer_data = UserSerializer(target_user)
        return Response(serializer_data.data, status=status.HTTP_200_OK)


class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
