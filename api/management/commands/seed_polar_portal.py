from django.core.management.base import BaseCommand
from api.models import ScienceTopic, Dataset, Resource

TOPICS = [
    {
        "topic": "climate", "region": "both", "title": "Why Polar Climate Matters",
        "summary": "The Arctic and Antarctic are important components of the Earth system and respond strongly to changes in climate.",
        "content": "Polar climate research examines atmosphere, temperature, snow, sea ice, ice sheets and their interactions with the ocean. Changes in polar environments can influence sea level, ecosystems and wider climate processes.",
        "source": "NASA Earthdata", "source_url": "https://www.earthdata.nasa.gov/"
    },
    {
        "topic": "climate", "region": "arctic", "title": "Arctic Climate",
        "summary": "The Arctic climate is shaped by sea ice, snow, ocean circulation and atmospheric processes.",
        "content": "Arctic climate studies commonly examine temperature, sea ice, snow cover, permafrost and atmosphere-ocean interactions. The region is also important for studying climate feedbacks.",
        "source": "NOAA", "source_url": "https://www.noaa.gov/"
    },
    {
        "topic": "climate", "region": "antarctic", "title": "Antarctic Climate",
        "summary": "Antarctica is a major component of the global cryosphere and climate system.",
        "content": "Antarctic climate research includes atmospheric conditions, snowfall, sea ice, ice-sheet mass changes and interactions between ice and ocean.",
        "source": "NASA Earthdata", "source_url": "https://www.earthdata.nasa.gov/"
    },
    {
        "topic": "ice", "region": "both", "title": "Sea Ice",
        "summary": "Sea ice is frozen seawater that grows and retreats seasonally in polar oceans.",
        "content": "Sea ice influences ocean-atmosphere exchanges, ecosystems and surface reflectivity. Researchers measure properties such as extent, concentration, thickness and drift.",
        "source": "NSIDC", "source_url": "https://nsidc.org/data"
    },
    {
        "topic": "ice", "region": "antarctic", "title": "Antarctic Ice Sheet",
        "summary": "The Antarctic Ice Sheet is a large body of land ice covering most of Antarctica.",
        "content": "Ice-sheet science examines accumulation, ice flow, ice shelves, grounding lines and interactions with the ocean and atmosphere.",
        "source": "NASA Earthdata", "source_url": "https://www.earthdata.nasa.gov/"
    },
    {
        "topic": "ice", "region": "arctic", "title": "Greenland Ice Sheet",
        "summary": "Greenland contains the second-largest ice sheet on Earth.",
        "content": "Research includes snowfall, surface melting, glacier flow, ice discharge and interactions with the surrounding ocean and atmosphere.",
        "source": "NASA Earthdata", "source_url": "https://www.earthdata.nasa.gov/"
    },
    {
        "topic": "oceans", "region": "arctic", "title": "Arctic Ocean",
        "summary": "The Arctic Ocean is the smallest and shallowest of the world's five major oceans and is strongly connected to the polar climate system.",
        "content": "Polar ocean research considers temperature, salinity, circulation, sea ice and marine ecosystems.",
        "source": "NOAA", "source_url": "https://www.noaa.gov/"
    },
    {
        "topic": "oceans", "region": "antarctic", "title": "Southern Ocean",
        "summary": "The Southern Ocean surrounds Antarctica and plays an important role in global ocean circulation.",
        "content": "Research includes water masses, circulation, carbon exchange, sea ice and marine ecosystems.",
        "source": "NOAA", "source_url": "https://www.noaa.gov/"
    },
    {
        "topic": "biodiversity", "region": "arctic", "title": "Arctic Biodiversity",
        "summary": "Arctic ecosystems contain organisms adapted to cold temperatures, seasonal darkness and changing sea ice.",
        "content": "Examples include polar bears, Arctic foxes, walruses, seals, seabirds and many marine organisms. Their habitats are closely connected to sea ice and ocean conditions.",
        "source": "NOAA", "source_url": "https://www.noaa.gov/"
    },
    {
        "topic": "biodiversity", "region": "antarctic", "title": "Antarctic Biodiversity",
        "summary": "Antarctic ecosystems include penguins, seals, whales, krill and diverse marine organisms.",
        "content": "Antarctic species have adaptations for extreme cold and strong seasonality. Marine food webs are closely connected to primary production and krill.",
        "source": "NOAA", "source_url": "https://www.noaa.gov/"
    },
]

DATASETS = [
    {
        "title": "NSIDC Sea Ice Index", "description": "A scientific sea-ice resource covering Arctic and Antarctic sea-ice information.",
        "category": "Ice & Glaciers", "region": "Arctic & Antarctic", "data_type": "Sea ice extent and concentration",
        "source": "NSIDC", "source_url": "https://nsidc.org/data/seaice_index", "data_url": "https://nsidc.org/data/seaice_index",
        "format": "CSV / PNG", "time_period": "Historical archive", "access_type": "external", "status": "external"
    },
    {
        "title": "NASA Earthdata", "description": "Discovery portal for Earth science data including cryosphere, climate and ocean observations.",
        "category": "Climate", "region": "Arctic & Antarctic", "data_type": "Earth science observations",
        "source": "NASA Earthdata", "source_url": "https://www.earthdata.nasa.gov/", "data_url": "https://search.earthdata.nasa.gov/",
        "format": "Multiple formats", "time_period": "Varies by dataset", "access_type": "external", "status": "external"
    },
    {
        "title": "NASA Worldview", "description": "Interactive satellite imagery and Earth observation visualization service.",
        "category": "Maps", "region": "Arctic & Antarctic", "data_type": "Satellite imagery",
        "source": "NASA", "source_url": "https://worldview.earthdata.nasa.gov/", "data_url": "https://worldview.earthdata.nasa.gov/",
        "format": "Web visualization", "time_period": "Varies by layer", "access_type": "external", "status": "external"
    },
]

class Command(BaseCommand):
    help = "Seed Polar Science Portal topic, dataset and resource metadata."

    def handle(self, *args, **kwargs):
        for item in TOPICS:
            ScienceTopic.objects.update_or_create(
                topic=item["topic"], title=item["title"],
                defaults=item
            )
        for item in DATASETS:
            Dataset.objects.update_or_create(
                title=item["title"], defaults=item
            )
            Resource.objects.update_or_create(
                title=item["title"],
                defaults={
                    "description": item["description"],
                    "category": item["category"],
                    "region": item["region"],
                    "resource_type": "dataset",
                    "source": item["source"],
                    "source_url": item["source_url"],
                    "external_url": item["data_url"],
                    "status": item["status"],
                }
            )
        self.stdout.write(self.style.SUCCESS("Polar portal seed data loaded."))
