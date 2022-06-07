from django.http import JsonResponse
from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser

from AphisClassBack.models import Aphis
from AphisClassBack.serializers import AphisSerializer


# procesuje requesty i generuje responsy.


@api_view(['GET', 'POST', 'DELETE'])
def aphids_list(request):
    if request.method == 'GET':
        aphids = Aphis.objects.all()

        name = request.GET.get('name', None)
        if name is not None:
            aphids = aphids.filter(name__icontains=name)

        aphis_serializer = AphisSerializer(aphids, many=True)
        return JsonResponse(aphis_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        aphis_data = JSONParser().parse(request)
        aphis_serializer = AphisSerializer(data=aphis_data)
    if aphis_serializer.is_valid():
        aphis_serializer.save()
        return JsonResponse(aphis_serializer.data, status=status.HTTP_201_CREATED)
    elif request.method == 'DELETE':
        count = Aphis.objects.all().delete()
        return JsonResponse({'message': '{} Aphids were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)
    return JsonResponse(aphis_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def aphis_detail(request, pk):
    # find aphid by pk (id)
    try:
        aphis = Aphis.objects.get(pk=pk)
    except Aphis.DoesNotExist:
        return JsonResponse({'message': 'The aphis does not exist'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        aphis_serializer = AphisSerializer(aphis)
        return JsonResponse(aphis_serializer.data)
    elif request.method == 'PUT':
        aphis_data = JSONParser().parse(request)
        aphis_serializer = AphisSerializer(aphis, data=aphis_data)
        if aphis_serializer.is_valid():
            aphis_serializer.save()
            return JsonResponse(aphis_serializer.data)
        return JsonResponse(aphis_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        aphis.delete()
        return JsonResponse({'message': 'Aphis was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)