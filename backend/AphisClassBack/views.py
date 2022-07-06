from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser, FileUploadParser
from rest_framework.response import Response

from AphisClassBack.classification.knn_classification import classify_knn
from AphisClassBack.models import Aphis
from AphisClassBack.serializers import AphisSerializer, FileSerializer


# procesuje requesty i generuje responsy.


@api_view(['GET', 'POST', 'DELETE'])
def aphids_list(request):
    if request.method == 'GET':
        aphids = Aphis.objects.all()

        name = request.GET.get('name', None)
        if name is not None:
            aphids = aphids.filter(name__icontains=name)

        aphids_serializer = AphisSerializer(aphids, many=True)
        return JsonResponse(aphids_serializer.data, safe=False)
        # 'safe=False' for objects serialization
    elif request.method == 'POST':
        aphis_data = JSONParser().parse(request)
        aphis_serializer = AphisSerializer(data=aphis_data)
        if aphis_serializer.is_valid():
            aphis_serializer.save()
            return JsonResponse(aphis_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(aphis_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        count = Aphis.objects.all().delete()
        return JsonResponse({'message': '{} Aphids were deleted successfully!'.format(count[0])},
                            status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'PUT', 'DELETE'])
def aphid_detail(request, pk):
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


@api_view(['POST'])
def classify_aphid(request):
    if request.method == 'POST':  # TODO tu nie będzie name, więc nowy model potrzebny?
        message = ''
        aphids = Aphis.objects.all().values()  # pobranie wszystkich z bazy
        all_aphids_list = list(aphids)
        aphid_data = JSONParser().parse(request)
        message = classify_knn(aphid_data, all_aphids_list)
        return JsonResponse({'result': message})


@api_view(['POST'])
def post_image(request, *args, **kwargs):
    parser_class = (FileUploadParser,)

    file_serializer = FileSerializer(data=request.data)

    if file_serializer.is_valid():
        file_serializer.save()
        return Response(file_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
