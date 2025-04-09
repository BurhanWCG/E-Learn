from rest_framework import serializers
from .models import Course
from .models import Payment
class CourseSerializer(serializers.ModelSerializer):
    author = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'category','enrolment_count', 'profile_picture','price', 'author', 'created_at']

    def create(self, validated_data):
       
        author = self.context['request'].user
        validated_data['author'] = author
        return Course.objects.create(**validated_data)
    
class getCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    course_title = serializers.ReadOnlyField(source='course.title') 


    class Meta:
        model = Payment
        fields = ['id','user', 'course', 'course_title','amount', 'transaction_id', 'payment_status', 'account_number', 'created_at']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user 
        return Payment.objects.create(**validated_data)

