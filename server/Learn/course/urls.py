from django.urls import path,include
from .views import CourseCreateView
from rest_framework.routers import DefaultRouter
from .views import ListCoursesView, AuthorCoursesView,CourseDetailView,PaymentHistoryView,PaymentView,CourseSearchView,CourseView,TopEnrolledCoursesView

router = DefaultRouter()

urlpatterns = [
    path('createcourse/', CourseCreateView.as_view(), name='signup'),
    path('getcourses/', ListCoursesView.as_view(), name='list-courses'),
    path('getmycourses/', AuthorCoursesView.as_view(), name='author-courses'),
    path('getstudentcourses/', AuthorCoursesView.as_view(), name='student-courses'),
    path('courses/<uuid:pk>/', CourseDetailView.as_view(), name='course-detail'),
    path('make/<uuid:pk>/', PaymentView.as_view(), name='make-payment'),
    path('history/', PaymentHistoryView.as_view(), name='payment-history'),
    path('search/', CourseSearchView.as_view(), name='search'),
    path('edit/<uuid:pk>/', CourseView.as_view(), name='edit'),
    path('featured_course/', TopEnrolledCoursesView.as_view(), name='featured_course'),

 ]
