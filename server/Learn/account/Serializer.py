from rest_framework import serializers
from .models import CustomUser

from django.contrib.auth import authenticate
from .models import Student, Teacher

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['username', 'email', 'password',]  

    def create(self, validated_data):
        validated_data['role'] = 'student'  
        user = Student.objects.create_user(**validated_data)
        return user

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['username', 'email', 'password', 'institution', 'bio']  

    def create(self, validated_data):
        validated_data['role'] = 'teacher'  
        user = Teacher.objects.create_user(**validated_data)
        return user
    
class Loginserializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
       email = data.get('email')
       password = data.get('password')

       if email and password:
           user = authenticate(email=email, password=password)
           if not user:
               raise serializers.ValidationError("invalid credintials")
       else :
           raise serializers.ValidationError("must include email and password")
       
       data['user'] = user
       return data
    