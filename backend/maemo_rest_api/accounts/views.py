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

    NONE = 'none'
    CHALLENGED = 'challenged'
    INFANT_COMPANION = 'infant_companion'
    PREGNANT = 'pregnant'
    CHILD = 'child'

class UserList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_convert_user_type(self, user_type):
        if user_type == "장애인":
            return "challenged"
        if user_type == "영유아 동반자":
            return "infant_companion"
        if user_type == "임산부":
            return "pregnant"
        if user_type == "어린이":
            return "child"
        if user_type == "고령자":
            return "old"
        if user_type == "해당없음":
            return "none"    


    @action(methods=['POST'], detail=False)
    def post(self, request, format=None):
        serializer_init_data = dict()

        request_data = request.data
        protector_type = request_data['protector_type']
        user_type = request_data['user_type']
        name = request_data['name']
        phone = request_data['phone']
        protector_phone = request_data.get('protector_phone')
        challenged_type = request_data.get('challenged_type')
        protector_type = request_data.get('protector_type')


        user_type_data = self.get_convert_user_type(user_type)
        print(user_type_data)
        print(protector_phone)
        print(challenged_type)
        print(protector_type)
        serializer_init_data['protector_type'] = protector_type
        serializer_init_data['user_type'] = user_type_data
        serializer_init_data['name'] = name
        serializer_init_data['phone'] = phone
        serializer_init_data['protector_phone'] = protector_phone
        serializer_init_data['challenged_type'] = challenged_type
        print(serializer_init_data)

        serializer = UserSerializerWithToken(data=serializer_init_data)
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
