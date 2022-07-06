from rest_framework import serializers
from AphisClassBack.models import Aphis, File


class AphisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aphis
        fields = ('id',
                  'name',
                  'date',
                  'length_of_body',
                  'hind_femora_length',
                  'hind_tibia_lenght',
                  'number_of_setae_on_cauda',
                  'cauda_length',
                  'image_url')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"
