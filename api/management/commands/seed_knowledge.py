from django.core.management.base import BaseCommand
from api.models import Knowledge
from datetime import date


class Command(BaseCommand):
    help = "Seed knowledge resources"

    def handle(self, *args, **kwargs):
        resources = [
            {
                "title": "Polar Climate Systems",
                "description": "Discover how atmospheric and ocean processes influence climate across the Arctic and Antarctic.",
                "category": "Climate",
                "author": "NCPOR",
            },
            {
                "title": "Climate Change in Polar Regions",
                "description": "Explore how temperature, atmospheric conditions and changing environmental patterns affect the polar regions.",
                "category": "Climate",
                "author": "PolarConnect Team",
            },
            {
                "title": "Sea Ice and Climate",
                "description": "Learn how seasonal sea-ice changes influence polar climate and the wider Earth system.",
                "category": "Climate",
                "author": "NCPOR",
            },
            {
                "title": "Ice Sheets and Glaciers",
                "description": "Learn about glacier dynamics, ice sheets and changing polar landscapes.",
                "category": "Ice & Glaciers",
                "author": "NCPOR",
            },
            {
                "title": "Glacier Dynamics",
                "description": "Understand how glaciers move, change and respond to environmental conditions.",
                "category": "Ice & Glaciers",
                "author": "PolarConnect Team",
            },
            {
                "title": "Polar Ocean Systems",
                "description": "Explore the role of polar oceans in global circulation, marine environments and climate.",
                "category": "Polar Oceans",
                "author": "NCPOR",
            },
            {
                "title": "Arctic Ocean Basics",
                "description": "Introduction to the Arctic Ocean and its importance to polar science.",
                "category": "Polar Oceans",
                "author": "PolarConnect Team",
            },
            {
                "title": "Antarctic Ocean Environment",
                "description": "Explore the Antarctic Ocean, its marine environment and its connection to the global climate system.",
                "category": "Polar Oceans",
                "author": "NCPOR",
            },
            {
                "title": "Life at the Poles",
                "description": "Understand polar biodiversity and the species adapted to extreme environments.",
                "category": "Wildlife",
                "author": "PolarConnect Team",
            },
            {
                "title": "Antarctic Wildlife",
                "description": "Explore Antarctic species and their adaptations to cold and changing polar environments.",
                "category": "Wildlife",
                "author": "NCPOR",
            },
            {
                "title": "Polar Ecosystems",
                "description": "Learn how organisms interact within Arctic and Antarctic ecosystems and food webs.",
                "category": "Wildlife",
                "author": "PolarConnect Team",
            },
            {
                "title": "Polar Field Research",
                "description": "Explore how scientists collect observations and conduct research in Earth's remote polar regions.",
                "category": "Polar Science",
                "author": "NCPOR",
            },
        ]

        for resource in resources:
            Knowledge.objects.get_or_create(
                title=resource["title"],
                defaults={
                    "description": resource["description"],
                    "category": resource["category"],
                    "author": resource["author"],
                    "date": date(2026, 9, 6),
                    "file_url": "",
                    "image_url": "",
                },
            )

        self.stdout.write(
            self.style.SUCCESS(
                "Knowledge resources seeded successfully."
            )
        )