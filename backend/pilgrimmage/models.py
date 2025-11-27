from django.db import models

# Create your models here.
class Pandit(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    deity = models.CharField(max_length=100, blank=True, null=True)  # ADD THIS
    latitude = models.FloatField()
    longitude = models.FloatField()



    def __str__(self):
        return self.name


class Temple(models.Model):
    name = models.CharField(max_length=120)
    deity = models.CharField(max_length=100, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()


    def __str__(self):
        return self.name


class LunchSpot(models.Model):
    name = models.CharField(max_length=120)
    cuisine = models.CharField(max_length=100, blank=True, null=True)
    rating = models.FloatField(blank=True, null=True)
    latitude = models.FloatField()
    longitude = models.FloatField()


    def __str__(self):
        return self.name