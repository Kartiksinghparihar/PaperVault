from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import PaperSerializer


@api_view(['POST'])
def upload_paper(request):

    serializer = PaperSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['GET'])
def get_papers(request):

    papers = Paper.objects.filter(approved=True)

    serializer = PaperSerializer(
        papers,
        many=True
    )

    return Response(serializer.data)