from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .Serializer import Loginserializer
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth import login
from rest_framework_simplejwt.tokens import AccessToken
from .Serializer import StudentSerializer, TeacherSerializer

class StudentSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Student account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TeacherSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = TeacherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Teacher account created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class LoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        serializer = Loginserializer(data = request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token = AccessToken.for_user(user)
            role= user.role
            if role == "student":
                 return Response({ "message": "Login successful",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "role" : user.role,
                    },
                    "token": str(token),
                    }, status=status.HTTP_200_OK)
                 
        return Response({"error": serializer.errors }, status=status.HTTP_400_BAD_REQUEST)
class TeacherLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = Loginserializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            role = user.role
            token = AccessToken.for_user(user)
            if role == "teacher":
                 return Response({
                "message": "Login successful",
                "user": {
                    "username": user.username,
                    "email": user.email,
                    "institution": user.institution,
                    "role" : user.role,
                    "bio": user.bio,
                },
                "token": str(token),
            }, status=status.HTTP_200_OK)
        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    