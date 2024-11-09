
from django.urls import path,include
from .views import StudentSignupView,LoginView,TeacherSignupView,TeacherLoginView
urlpatterns = [
    path('studentsignup/', StudentSignupView.as_view(), name='signup'),
    path('teachersignup/', TeacherSignupView.as_view(), name='teachersignup'),
    path('login/', LoginView.as_view(), name='login'),  
    path('teacherlogin/', TeacherLoginView.as_view(), name='teacherlogin'), 
]
