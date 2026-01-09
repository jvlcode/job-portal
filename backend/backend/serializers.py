# jobs/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Job
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id',
            'title',
            'description',
            'company',
            'location',
            'salary_range',
            'posted_on',
            'created_by',
        ]