from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    ROLE_CHOICES = [('user', 'User'), ('admin', 'Admin')]
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='user')
    def __str__(self): return self.name


class Knowledge(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    author = models.CharField(max_length=150)
    date = models.DateField()
    file_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.title


class Research(models.Model):
    title = models.CharField(max_length=255)
    authors = models.TextField()
    abstract = models.TextField()
    year = models.IntegerField()
    journal = models.CharField(max_length=255, blank=True)
    pdf_url = models.URLField(blank=True, null=True)
    external_link = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.title


class Media(models.Model):
    MEDIA_TYPE_CHOICES = [('image', 'Image'), ('video', 'Video'), ('audio', 'Audio')]
    title = models.CharField(max_length=255)
    description = models.TextField()
    media_type = models.CharField(max_length=20, choices=MEDIA_TYPE_CHOICES)
    thumbnail = models.URLField(blank=True, null=True)
    media_url = models.URLField()
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self): return self.title


class PolarLocation(models.Model):
    name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    description = models.TextField(blank=True)
    region = models.CharField(max_length=100)
    def __str__(self): return self.name


class ScienceTopic(models.Model):
    TOPIC_CHOICES = [
        ('climate', 'Climate'),
        ('ice', 'Ice & Glaciers'),
        ('oceans', 'Polar Oceans'),
        ('biodiversity', 'Biodiversity'),
    ]
    REGION_CHOICES = [('arctic', 'Arctic'), ('antarctic', 'Antarctic'), ('both', 'Arctic & Antarctic')]
    topic = models.CharField(max_length=30, choices=TOPIC_CHOICES)
    region = models.CharField(max_length=20, choices=REGION_CHOICES, default='both')
    title = models.CharField(max_length=255)
    summary = models.TextField()
    content = models.TextField()
    image_url = models.URLField(blank=True, null=True)
    source = models.CharField(max_length=255, blank=True)
    source_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['topic', 'title']
    def __str__(self): return self.title


class Dataset(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('external', 'External'),
        ('requires_access', 'Requires Access'),
        ('unavailable', 'Unavailable'),
    ]
    ACCESS_CHOICES = [('public', 'Public'), ('external', 'External'), ('restricted', 'Restricted')]
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    region = models.CharField(max_length=100, default='Arctic & Antarctic')
    data_type = models.CharField(max_length=150, blank=True)
    source = models.CharField(max_length=255)
    source_url = models.URLField()
    data_url = models.URLField(blank=True, null=True)
    format = models.CharField(max_length=100, blank=True)
    time_period = models.CharField(max_length=100, blank=True)
    access_type = models.CharField(max_length=20, choices=ACCESS_CHOICES, default='external')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='external')
    image_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['category', 'title']
    def __str__(self): return self.title



class DatasetPoint(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name='points')
    label = models.CharField(max_length=100)
    value = models.FloatField()
    unit = models.CharField(max_length=50, blank=True)
    source_date = models.DateField(blank=True, null=True)

    class Meta:
        ordering = ['source_date', 'label']

    def __str__(self):
        return f"{self.dataset.title} - {self.label}"

class Resource(models.Model):
    TYPE_CHOICES = [
        ('knowledge', 'Knowledge'), ('research', 'Research'), ('media', 'Media'),
        ('dataset', 'Dataset'), ('report', 'Report'), ('map', 'Map'),
    ]
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.CharField(max_length=100)
    region = models.CharField(max_length=100, default='Arctic & Antarctic')
    resource_type = models.CharField(max_length=30, choices=TYPE_CHOICES)
    year = models.IntegerField(blank=True, null=True)
    source = models.CharField(max_length=255)
    source_url = models.URLField()
    external_url = models.URLField(blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    status = models.CharField(max_length=30, default='external')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-year', 'title']
    def __str__(self): return self.title
