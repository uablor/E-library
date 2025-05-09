"""
WSGI config for core project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

from dotenv import load_dotenv

load_dotenv() 
DJANGO_MODE = os.getenv("DJANGO_MODE", "development").lower()
if DJANGO_MODE == "development" or DJANGO_MODE == "dev":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.development")
elif DJANGO_MODE == "production" or DJANGO_MODE == "production":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")
else:
    raise ValueError(f"Invalid DJANGO_MODE value: {DJANGO_MODE}")

application = get_wsgi_application()
