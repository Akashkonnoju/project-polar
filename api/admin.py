from django.contrib import admin
from .models import (
    UserProfile, Knowledge, Research, Media, PolarLocation,
    ScienceTopic, Dataset, DatasetPoint, Resource
)

admin.site.register([
    UserProfile, Knowledge, Research, Media, PolarLocation,
    ScienceTopic, Dataset, DatasetPoint, Resource
])
