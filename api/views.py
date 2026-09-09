from rest_framework import viewsets
from django.db import models
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .models import UserProfile, Knowledge, Research, Media, PolarLocation
from .serializers import (
    UserProfileSerializer,
    KnowledgeSerializer,
    ResearchSerializer,
    MediaSerializer,
    PolarLocationSerializer,
    RegisterSerializer,
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


@api_view(['GET'])
def search(request):
    query = request.GET.get('q', '').strip()

    if not query:
        return Response({
            'knowledge': [],
            'research': [],
            'media': []
        })

    knowledge = Knowledge.objects.filter(
        models.Q(title__icontains=query) |
        models.Q(description__icontains=query) |
        models.Q(category__icontains=query) |
        models.Q(author__icontains=query)
    )

    research = Research.objects.filter(
        models.Q(title__icontains=query) |
        models.Q(authors__icontains=query) |
        models.Q(abstract__icontains=query) |
        models.Q(journal__icontains=query)
    )

    media = Media.objects.filter(
        models.Q(title__icontains=query) |
        models.Q(description__icontains=query) |
        models.Q(media_type__icontains=query)
    )

    return Response({
        'knowledge': KnowledgeSerializer(knowledge, many=True).data,
        'research': ResearchSerializer(research, many=True).data,
        'media': MediaSerializer(media, many=True).data
    })
    
@api_view(['POST'])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()

        return Response({
            'message': 'User registered successfully',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
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
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
        })

    return Response({
        'message': 'Invalid username or password'
    }, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def topics(request):
    topic = request.GET.get('topic', '').strip().lower()

    if not topic:
        return Response([])

    knowledge = Knowledge.objects.filter(
        models.Q(category__icontains=topic) |
        models.Q(title__icontains=topic) |
        models.Q(description__icontains=topic)
    )

    return Response(
        KnowledgeSerializer(knowledge, many=True).data
    )
    
@api_view(['GET'])
def resources(request):
    category = request.GET.get('category', '').strip()

    knowledge = Knowledge.objects.all()

    if category:
        knowledge = knowledge.filter(category__iexact=category)

    return Response(
        KnowledgeSerializer(knowledge, many=True).data
    )
    
@api_view(['POST'])
def forgot_password(request):
    username = request.data.get('username')
    new_password = request.data.get('new_password')

    if not username or not new_password:
        return Response({
            'message': 'Username and new password are required'
        }, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({
            'message': 'User not found'
        }, status=status.HTTP_404_NOT_FOUND)

    user.set_password(new_password)
    user.save()

    return Response({
        'message': 'Password reset successfully'
    }, status=status.HTTP_200_OK)