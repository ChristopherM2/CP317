from django.utils import dateformat, timezone
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .appModules.login import *

from .appModules.friends import *
from .appModules.user import *
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


# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'}, status=200)


@api_view(['GET'])
def get_user(request):
    return user.getuser(None,request, app)


@api_view(['POST', 'GET'])
def login(request):
    return Login.loginreqs(None, request, app)


@api_view(['GET', 'POST'])
def signup(request):
    login = Login()
    return Login.signupreqs(None,request, app)


@api_view(['POST', 'DELETE'])
def friends(request):
    return friends(None,request, app)


@api_view(['GET'])
def new_group(request):
    return group.newgroup(None,request, app)


@api_view(['POST'])
def add_user_to_group(request):
    return group.addusertogroup(None,request, app)


@api_view(['DELETE'])
def remove_user_from_group(request):
    return group.removeuserfromGroup(None,request, app)


@api_view(['GET'])
def get_group(request):
    return group.getgroup(None,request, app)


@api_view(['GET'])
def current_time(request):
    now = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
    return Response({'time': str(now)})


@api_view(['POST'])
def sendMessage(request):
    return group.sendmessage(None,request, app)


@api_view(['POST'])
def addTask(request):
    return group.addtask(None,request, app)


@api_view(['GET'])
def getTasks(request):
    return group.gettasks(None,request, app)


def getMessages(request):
    return group.getmessages(None,request, app)





def completetask(request):
    return group.updatemembercompletion(None,request, app)


def getCompletedTasks(request):
    return group.getcompletedtasks(None,request, app)


def getGroupMembers(request):
    return group.getgroupmembers(None,request, app)


def updateMemberCompletion(request):
    return group.updatemembercompletion(None,request, app)