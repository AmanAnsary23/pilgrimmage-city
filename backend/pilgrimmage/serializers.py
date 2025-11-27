from rest_framework import serializers
from .models import Pandit, Temple, LunchSpot

class PanditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pandit
        fields = '__all__'

class TempleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temple
        fields = '__all__'

class LunchSpotSerializer(serializers.ModelSerializer):
    class Meta:
        model = LunchSpot
        fields = '__all__'
