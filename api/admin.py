from django.contrib import admin
from .models import UserProfile, Knowledge, Research, Media, PolarLocation

admin.site.register(UserProfile)
admin.site.register(Knowledge)
admin.site.register(Research)
admin.site.register(Media)
admin.site.register(PolarLocation)