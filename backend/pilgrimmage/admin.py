from django.contrib import admin

# Register your models here.
from .models import Pandit, Temple, LunchSpot

admin.site.register(Pandit)
admin.site.register(Temple)
admin.site.register(LunchSpot)