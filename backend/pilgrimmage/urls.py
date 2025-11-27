from django.urls import path
from .views import PanditList, TempleList, LunchSpotList , ai_summary

urlpatterns = [
    path("pandits/", PanditList.as_view(), name="pandit-list"),
    path("temples/", TempleList.as_view(), name="temple-list"),
    path("lunchspots/", LunchSpotList.as_view(), name="lunchspot-list"),
    path("ai/summary", ai_summary),
]
