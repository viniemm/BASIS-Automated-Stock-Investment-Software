from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# Register API
# input: body => username, email, password
# output: bosy => user {id, username, email, password}, token


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    # POST requests only!
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        # USER: serialized version of user data
        # TOKEN: creates unique auth token for user
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Login API
# input:  body => username, password
# output: body => user {id, username, email, password}, token


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    # POST requests only!
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        # USER: serialized version of user data
        # TOKEN: creates unique auth token for user
        _, token = AuthToken.objects.create(user)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

# Get User API
# input: header => Authorization = Token <token>
# output: body => id, username, email


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    # GET requests only!

    def get_object(self):
        return self.request.user
