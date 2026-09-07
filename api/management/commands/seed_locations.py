from django.core.management.base import BaseCommand
from api.models import PolarLocation


class Command(BaseCommand):
    help = "Add sample polar locations"

    def handle(self, *args, **kwargs):

        locations = [
            {
                "name": "Antarctica",
                "latitude": -82.862800,
                "longitude": 135.000000,
                "description": "Antarctic polar research region",
                "region": "Antarctica",
            },
            {
                "name": "Maitri Research Station",
                "latitude": -70.764444,
                "longitude": 11.734167,
                "description": "India's second permanent research station in Antarctica, located in the Schirmacher Oasis.",
                "region": "Antarctica",
            },
            {
                "name": "Bharati Research Station",
                "latitude": -69.406833,
                "longitude": 76.195333,
                "description": "India's research station in the Larsemann Hills region of Antarctica, supporting year-round scientific research.",
                "region": "Antarctica",
            },
            {
                "name": "Rothera Research Station",
                "latitude": -67.568889,
                "longitude": -68.124800,
                "description": "A major Antarctic research and logistics station on Adelaide Island.",
                "region": "Antarctica",
            },
            {
                "name": "Amundsen-Scott South Pole Station",
                "latitude": -90.000000,
                "longitude": 0.000000,
                "description": "A research station located at the geographic South Pole.",
                "region": "Antarctica",
            },
        ]

        for location in locations:
            PolarLocation.objects.update_or_create(
                name=location["name"],
                defaults=location,
            )

        self.stdout.write(
            self.style.SUCCESS("Polar locations seeded successfully.")
        )