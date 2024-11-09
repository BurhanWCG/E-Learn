from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .manager import CustomUserManager

class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=250, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=100)
    institution = models.CharField(max_length=255, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class Student(CustomUser):
    class Meta:
        verbose_name = 'Student'
        verbose_name_plural = 'Students'

    def __str__(self):
        return f"Student: {self.username}"

class Teacher(CustomUser):
    

    class Meta:
        verbose_name = 'Teacher'
        verbose_name_plural = 'Teachers'

    def __str__(self):
        return f"Teacher: {self.username}"
