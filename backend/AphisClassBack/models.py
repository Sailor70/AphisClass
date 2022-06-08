from django.db import models


class Aphis(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')   # gatunek
    date = models.DateTimeField(null=True)
    length_of_body = models.FloatField(null=True)
    hind_femora_length = models.FloatField(null=True)
    hind_tibia_lenght = models.FloatField(null=True)
    number_of_setae_on_cauda = models.IntegerField(null=True)
    cauda_length = models.FloatField(null=True)
    # TODO pozostałe pola
