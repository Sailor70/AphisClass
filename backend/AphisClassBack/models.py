from django.db import models


def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)


class Aphis(models.Model):
    name = models.CharField(max_length=70, blank=False, default='')   # gatunek
    date = models.DateTimeField(null=True)
    length_of_body = models.FloatField(null=True)
    hind_femora_length = models.FloatField(null=True)
    hind_tibia_lenght = models.FloatField(null=True)
    number_of_setae_on_cauda = models.IntegerField(null=True)
    cauda_length = models.FloatField(null=True)
    image_url = models.CharField(max_length=100, blank=True, null=True)
    # TODO pozostałe pola


class File(models.Model):
    file = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def __str__(self):
        return self.file.name