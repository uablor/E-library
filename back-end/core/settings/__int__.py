import os
from dotenv import load_dotenv


load_dotenv()
DJANGO_MODE = os.getenv("DJANGO_MODE", "development").lower()

if DJANGO_MODE == "production" or DJANGO_MODE == "prod":
    from .production import *
else:
    from .development import *