from django.utils import dateformat, timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .appModules.login import loginreqs
from .appModules.login import signupreqs
from .appModules.friends import friends
from .appModules.user import getuser
from .appModules.group import *
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

"""
-------------------------------------------------------
Each method is a view that returns a response to the client, 
@api view declares what type of http requests are allowed get delete  or post
Use: variable = methodname(params)
-------------------------------------------------------
Parameters:
    1- Http request
Returns:
    Respective Return per method
-------------------------------------------------------
"""
cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'}, status=200)


@api_view(['GET'])
def get_user(request):
    return getuser(request, db)


@api_view(['POST', 'GET'])
def login(request):
    return loginreqs(request, db)


@api_view(['GET', 'POST'])
def signup(request):
    return signupreqs(request, db)


@api_view(['POST', 'DELETE'])
def friends(request):
    return friends(request, db)


@api_view(['GET'])
def new_group(request):
    return newGroup(request, db)


@api_view(['POST'])
def add_user_to_group(request):
    return addUserToGroup(request, db)


@api_view(['DELETE'])
def remove_user_from_group(request):
    return removeUserFromGroup(request, db)


@api_view(['GET'])
def get_group(request):
    return getGroup(request, db)


@api_view(['GET'])
def current_time(request):
    now = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
    return Response({'time': str(now)})
