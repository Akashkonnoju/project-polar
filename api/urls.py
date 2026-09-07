from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import (
    UserProfileViewSet, KnowledgeViewSet, ResearchViewSet, MediaViewSet,
    PolarLocationViewSet, ScienceTopicViewSet, DatasetViewSet, ResourceViewSet,
    search, register, login, dataset_points,
)

router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'knowledge', KnowledgeViewSet)
router.register(r'research', ResearchViewSet)
router.register(r'media', MediaViewSet)
router.register(r'locations', PolarLocationViewSet)
router.register(r'topics', ScienceTopicViewSet)
router.register(r'datasets', DatasetViewSet)
router.register(r'resources', ResourceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('datasets/<int:dataset_id>/points/', dataset_points, name='dataset-points'),
    path('search/', search, name='search'),
    path('register/', register, name='register'),
    path('login/', login, name='login'),
]
