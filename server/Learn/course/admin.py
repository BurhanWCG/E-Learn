# Course/admin.py

from django.contrib import admin
from .models import Course,Payment

class CourseAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id','title', 'category', 'author','profile_picture','enrolment_count', 'price','created_at')

    # Fields to add filters
    list_filter = ('category', 'author')

    # Fields to search within
    search_fields = ('title', 'description', 'category')

    # Optional: Fields to display in detail view
    fields = ('title', 'description', 'category', 'profile_picture', 'author','price', 'created_at')
    readonly_fields = ('created_at',)  # Make 'created_at' read-only if you don't want to allow editing

admin.site.register(Course, CourseAdmin)

class PaymentAdmin(admin.ModelAdmin):
    # Fields to display in the list view
    list_display = ('id','user', 'course', 'account_number')

admin.site.register(Payment, PaymentAdmin)
