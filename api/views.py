from django.db import models
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    UserProfile, Knowledge, Research, Media, PolarLocation,
    ScienceTopic, Dataset, DatasetPoint, Resource
)
from .serializers import (
    UserProfileSerializer, KnowledgeSerializer, ResearchSerializer,
    MediaSerializer, PolarLocationSerializer, ScienceTopicSerializer,
    DatasetSerializer, DatasetPointSerializer, ResourceSerializer, RegisterSerializer
)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class KnowledgeViewSet(viewsets.ModelViewSet):
    queryset = Knowledge.objects.all()
    serializer_class = KnowledgeSerializer


class ResearchViewSet(viewsets.ModelViewSet):
    queryset = Research.objects.all()
    serializer_class = ResearchSerializer


class MediaViewSet(viewsets.ModelViewSet):
    queryset = Media.objects.all()
    serializer_class = MediaSerializer


class PolarLocationViewSet(viewsets.ModelViewSet):
    queryset = PolarLocation.objects.all()
    serializer_class = PolarLocationSerializer


class ScienceTopicViewSet(viewsets.ModelViewSet):
    queryset = ScienceTopic.objects.all()
    serializer_class = ScienceTopicSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        topic = self.request.query_params.get('topic')
        region = self.request.query_params.get('region')
        if topic:
            qs = qs.filter(topic=topic)
        if region:
            qs = qs.filter(region=region)
        return qs


class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        region = self.request.query_params.get('region')
        status_value = self.request.query_params.get('status')
        if category:
            qs = qs.filter(category__icontains=category)
        if region:
            qs = qs.filter(region__icontains=region)
        if status_value:
            qs = qs.filter(status=status_value)
        return qs


class ResourceViewSet(viewsets.ModelViewSet):
    queryset = Resource.objects.all()
    serializer_class = ResourceSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        region = self.request.query_params.get('region')
        resource_type = self.request.query_params.get('resource_type')
        year = self.request.query_params.get('year')
        if category:
            qs = qs.filter(category__icontains=category)
        if region:
            qs = qs.filter(region__icontains=region)
        if resource_type:
            qs = qs.filter(resource_type=resource_type)
        if year and year.isdigit():
            qs = qs.filter(year=int(year))
        return qs


@api_view(['GET'])
def search(request):
    query = request.GET.get('q', '').strip()

    if not query:
        return Response({
            'knowledge': [], 'research': [], 'media': [], 'locations': [],
            'topics': [], 'datasets': [], 'resources': []
        })

    q = models.Q
    knowledge = Knowledge.objects.filter(
        q(title__icontains=query) | q(description__icontains=query) |
        q(category__icontains=query) | q(author__icontains=query)
    )
    research = Research.objects.filter(
        q(title__icontains=query) | q(authors__icontains=query) |
        q(abstract__icontains=query) | q(journal__icontains=query)
    )
    media = Media.objects.filter(
        q(title__icontains=query) | q(description__icontains=query) |
        q(media_type__icontains=query)
    )
    locations = PolarLocation.objects.filter(
        q(name__icontains=query) | q(region__icontains=query) |
        q(description__icontains=query)
    )
    topics = ScienceTopic.objects.filter(
        q(title__icontains=query) | q(summary__icontains=query) |
        q(content__icontains=query) | q(topic__icontains=query) |
        q(region__icontains=query)
    )
    datasets = Dataset.objects.filter(
        q(title__icontains=query) | q(description__icontains=query) |
        q(category__icontains=query) | q(region__icontains=query) |
        q(source__icontains=query) | q(data_type__icontains=query)
    )
    resources = Resource.objects.filter(
        q(title__icontains=query) | q(description__icontains=query) |
        q(category__icontains=query) | q(region__icontains=query) |
        q(resource_type__icontains=query) | q(source__icontains=query)
    )

    return Response({
        'knowledge': KnowledgeSerializer(knowledge, many=True).data,
        'research': ResearchSerializer(research, many=True).data,
        'media': MediaSerializer(media, many=True).data,
        'locations': PolarLocationSerializer(locations, many=True).data,
        'topics': ScienceTopicSerializer(topics, many=True).data,
        'datasets': DatasetSerializer(datasets, many=True).data,
        'resources': ResourceSerializer(resources, many=True).data,
    })


@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User registered successfully',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        return Response({
            'message': 'Login successful',
            'user': {'id': user.id, 'username': user.username, 'email': user.email}
        })
    return Response({'message': 'Invalid username or password'},
                    status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def dataset_points(request, dataset_id):
    points = DatasetPoint.objects.filter(dataset_id=dataset_id)
    return Response(DatasetPointSerializer(points, many=True).data)
