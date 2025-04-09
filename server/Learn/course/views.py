from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Course,Payment
from .serializer import CourseSerializer,PaymentSerializer
from rest_framework import generics, permissions
from .models import Course
from .serializer import CourseSerializer,getCourseSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from .documents import CourseDocument
import uuid,logging



class CourseCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = CourseSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            course = serializer.save()
            return Response(CourseSerializer(course).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            



class ListCoursesView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    

class AuthorCoursesView(generics.ListAPIView):
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Course.objects.filter(author=user)
    
class StudentCoursesView(generics.ListAPIView):
    serializer_class = PaymentSerializer  # Return Payment data
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self): 
        return Payment.objects.filter(user=self.request.user)
        

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]


class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        user = request.user
        course = Course.objects.get(id=pk)
        if Payment.objects.filter(user=user, course=course, payment_status=True).exists():
            return Response(
                {"detail": "You have already purchased this course."},status=status.HTTP_409_CONFLICT
            )
        amount = course.price 
        title = course.title
        account_number = request.data.get('accountNumber', None)
        expiry_date = request.data.get('expiryDate', None) 
        cvv = request.data.get('cvv', None)               
        payment_method = request.data.get('paymentMethod', None)

        if not account_number:
            return Response({"error": "Account number is required"}, status=status.HTTP_400_BAD_REQUEST)

        transaction_id = str(uuid.uuid4())

        payment_data = {
            'course': course.id,
            'amount': amount,
            'course_title': title,
            'transaction_id': transaction_id,
            'account_number': account_number,
            'payment_status': True,  
        }

        serializer = PaymentSerializer(data=payment_data, context={'request': request})
        if serializer.is_valid():
               payment=serializer.save()
               course.enrolment_count+=1
               course.save()
               return Response(PaymentSerializer(payment).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TopEnrolledCoursesView(APIView):
    permission_classes= [AllowAny]
    def get(self, request, format=None):
        try:
            
            top_courses = Course.objects.order_by('-enrolment_count')[:3]
            serializer = CourseSerializer(top_courses, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Course.DoesNotExist:
            return Response(
                {"error": "Courses not found."}, 
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            
            return Response(
                {"error": "An error occurred while fetching the top courses.", "details": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
class CourseView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk=None):
        try:
            course = Course.objects.get(id=pk)
        except Course.DoesNotExist:
            return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk=None):
        try:
           course = Course.objects.get(id=pk)
        
    
           if Payment.objects.filter(course=course).exists():
            return Response({'error': 'Cannot delete course. Payments exist for this course.'}, status=status.HTTP_400_BAD_REQUEST)

           course.delete()
           return Response({'message': 'Course deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
    
        except Course.DoesNotExist:
         return Response({'error': 'Course not found'}, status=status.HTTP_404_NOT_FOUND)
    
        except Exception as e:
         return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



    
class PaymentHistoryView(generics.ListAPIView):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)
class CourseSearchView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        search_query = request.data.get('q', None)
        
        if search_query:
            
            courses = CourseDocument.search().query(
                "multi_match", 
                query=search_query, 
                fields=['title', 'description']
            )
            courses = courses.execute()
            
            course_ids = [hit.meta.id for hit in courses]
            
           
            full_courses = Course.objects.filter(id__in=course_ids)
            
           
            course_data = CourseSerializer(full_courses, many=True).data
            
            return Response(course_data, status=status.HTTP_200_OK)
        
        return Response({'error': 'Search query is required.'}, status=status.HTTP_400_BAD_REQUEST)