from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet,
    KnowledgeViewSet,
    ResearchViewSet,
    MediaViewSet,
    PolarLocationViewSet,
    search,
    register,
    login,
    topics,
    resources,
    forgot_password,
)

router = DefaultRouter()

router.register(r'users', UserProfileViewSet)
router.register(r'knowledge', KnowledgeViewSet)
router.register(r'research', ResearchViewSet)
router.register(r'media', MediaViewSet)
router.register(r'locations', PolarLocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('search/', search, name='search'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
    path('topics/', topics, name='topics'),
    path('resources/', resources, name='resources'),
    path('forgot-password/', forgot_password, name='forgot-password'),
]