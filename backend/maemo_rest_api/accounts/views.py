from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from accounts.serializers import UserSerializer, UserSerializerWithToken, ProfileSerializer
from rest_framework import permissions, status, generics
from accounts.models import User, Profile
from rest_framework.decorators import action


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

    # @action(methods=['GET'], detail=False)
    # def get(self, request, format=None):



class ProfileUpdateAPI(generics.UpdateAPIView):
    lookup_field = "user_pk"
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer