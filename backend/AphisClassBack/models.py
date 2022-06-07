from django.db import models


class Aphis(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')   # gatunek
    date = models.DateTimeField()
    length_of_body = models.FloatField()
    # TODO pozostałe pola
