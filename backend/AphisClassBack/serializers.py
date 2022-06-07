from rest_framework import serializers
from AphisClassBack.models import Aphis


class AphisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aphis
        fields = ('id',
                  'name',
                  'date',
                  'length_of_body')
