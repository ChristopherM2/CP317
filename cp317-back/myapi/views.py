from django.utils import dateformat, timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .appModules.login import loginreqs
from .appModules.login import signupreqs
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'}, status=200)

@api_view(['GET'])
def get_user(request):
    return Response({'message': 'Not Yet'}, status=501)

@api_view(['POST', 'GET'])
def login(request):
    return loginreqs(request)


@api_view(['GET', 'POST'])
def signup(request):
    return signupreqs(request)


@api_view(['POST', 'DELETE'])
def friends(request):
    return Response({'message': "Not yet"}, status=501)


@api_view(['GET'])
def group(request):
    return Response({'message': 'Not Yet'}, status=501)


@api_view(['GET'])
def current_time(request):
    now = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
    return Response({'time': str(now)})
