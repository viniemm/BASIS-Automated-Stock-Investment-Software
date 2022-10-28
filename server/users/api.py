from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

# can test this in Postman

# Register API (POST)
# input: ContentType (Key) = application/json (Value); body (application/json) => username, email, password
# output: body => user {id, username, email, password}, token


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

# Login API (POST)
# input:  header => ContentType (Key) = application/json (Value); body (application/json) => username, password
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

# User API (GET)
# input: header => Authorization (Key) = Token <token> (Value)
# output: body => id, username, email


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerializer
    # GET requests only!

    def get_object(self):
        return self.request.user
