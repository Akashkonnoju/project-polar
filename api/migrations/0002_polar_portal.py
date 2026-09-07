# Generated for the Polar Science Portal extension.
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="ScienceTopic",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("topic", models.CharField(choices=[("climate","Climate"),("ice","Ice & Glaciers"),("oceans","Polar Oceans"),("biodiversity","Biodiversity")], max_length=30)),
                ("region", models.CharField(choices=[("arctic","Arctic"),("antarctic","Antarctic"),("both","Arctic & Antarctic")], default="both", max_length=20)),
                ("title", models.CharField(max_length=255)),
                ("summary", models.TextField()),
                ("content", models.TextField()),
                ("image_url", models.URLField(blank=True, null=True)),
                ("source", models.CharField(blank=True, max_length=255)),
                ("source_url", models.URLField(blank=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["topic","title"]},
        ),
        migrations.CreateModel(
            name="Dataset",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("category", models.CharField(max_length=100)),
                ("region", models.CharField(default="Arctic & Antarctic", max_length=100)),
                ("data_type", models.CharField(blank=True, max_length=150)),
                ("source", models.CharField(max_length=255)),
                ("source_url", models.URLField()),
                ("data_url", models.URLField(blank=True, null=True)),
                ("format", models.CharField(blank=True, max_length=100)),
                ("time_period", models.CharField(blank=True, max_length=100)),
                ("access_type", models.CharField(choices=[("public","Public"),("external","External"),("restricted","Restricted")], default="external", max_length=20)),
                ("status", models.CharField(choices=[("available","Available"),("external","External"),("requires_access","Requires Access"),("unavailable","Unavailable")], default="external", max_length=20)),
                ("image_url", models.URLField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["category","title"]},
        ),
        migrations.CreateModel(
            name="Resource",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("title", models.CharField(max_length=255)),
                ("description", models.TextField()),
                ("category", models.CharField(max_length=100)),
                ("region", models.CharField(default="Arctic & Antarctic", max_length=100)),
                ("resource_type", models.CharField(choices=[("knowledge","Knowledge"),("research","Research"),("media","Media"),("dataset","Dataset"),("report","Report"),("map","Map")], max_length=30)),
                ("year", models.IntegerField(blank=True, null=True)),
                ("source", models.CharField(max_length=255)),
                ("source_url", models.URLField()),
                ("external_url", models.URLField(blank=True, null=True)),
                ("image_url", models.URLField(blank=True, null=True)),
                ("status", models.CharField(default="external", max_length=30)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={"ordering": ["-year","title"]},
        ),
        migrations.CreateModel(
            name="DatasetPoint",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("label", models.CharField(max_length=100)),
                ("value", models.FloatField()),
                ("unit", models.CharField(blank=True, max_length=50)),
                ("source_date", models.DateField(blank=True, null=True)),
                ("dataset", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="points", to="api.dataset")),
            ],
            options={"ordering": ["source_date","label"]},
        ),
    ]
