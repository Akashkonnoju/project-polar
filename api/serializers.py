from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    UserProfile, Knowledge, Research, Media, PolarLocation,
    ScienceTopic, Dataset, DatasetPoint, Resource
)

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'

class KnowledgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Knowledge
        fields = '__all__'

class ResearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Research
        fields = '__all__'

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = '__all__'

class PolarLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolarLocation
        fields = '__all__'

class ScienceTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScienceTopic
        fields = '__all__'

class DatasetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dataset
        fields = '__all__'

class DatasetPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatasetPoint
        fields = '__all__'

class ResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resource
        fields = '__all__'

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
