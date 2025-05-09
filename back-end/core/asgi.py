"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

from dotenv import load_dotenv

from apps.apis.routing import websocket_urlpatterns

load_dotenv() 
DJANGO_MODE = os.getenv("DJANGO_MODE", "development").lower()
if DJANGO_MODE == "development" or DJANGO_MODE == "dev":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.development")
elif DJANGO_MODE == "production" or DJANGO_MODE == "production":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "core.settings.production")
else:
    raise ValueError(f"Invalid DJANGO_MODE value: {DJANGO_MODE}")

application = ProtocolTypeRouter({
    "http": get_asgi_application(), 
    "websocket": AuthMiddlewareStack(
        URLRouter( websocket_urlpatterns )
    ),
})
