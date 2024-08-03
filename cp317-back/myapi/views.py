from django.utils import dateformat, timezone
from rest_framework.decorators import api_view

from .appModules.group import *
from .appModules.login import *
from .appModules.settings import *
from .appModules.user import *

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
@api_view(['GET', 'POST'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'}, status=200)


@api_view(['GET', 'POST'])
def get_user(request):
    return user.getuser(None,request, app)

@api_view(['GET', 'POST'])
def get_public_user(request):
    return user.get_public_user(None,request, app)

@api_view(['GET', 'POST'])
def find_public_token(request):
    return user.findPublicToken(None,request, app)


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


@api_view(['GET', 'POST'])
def new_group(request):
    return group.newgroup(None,request, app)


@api_view(['POST'])
def add_user_to_group(request):
    return group.addusertogroup(None,request, app)


@api_view(['DELETE'])
def remove_user_from_group(request):
    return group.removeuserfromGroup(None,request, app)


@api_view(['GET', 'POST'])
def get_group(request):
    return group.getgroup(None,request, app)


@api_view(['GET', 'POST'])
def current_time(request):
    now = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
    return Response({'time': str(now)})


@api_view(['GET', 'POST'])
def sendMessage(request):
    return group.sendmessage(None,request, app)


@api_view(['GET', 'POST'])
def addTask(request):
    return group.addtask(None,request, app)


@api_view(['GET', 'POST'])
def getTasks(request):
    return group.gettasks(None,request, app)

@api_view(['GET', 'POST'])
def getMessages(request):
    return group.getmessages(None,request, app)




@api_view(['GET', 'POST'])
def completetask(request):
    return group.completeTask(None,request, app)

@api_view(['GET', 'POST'])
def getCompletedTasks(request):
    return group.getcompletedtasks(None,request, app)

@api_view(['GET', 'POST'])
def getGroupMembers(request):
    return group.getgroupmembers(None,request, app)

@api_view(['GET', 'POST'])
def updateMemberCompletion(request):
    return group.updatemembercompletion(None,request, app)

@api_view(['GET', 'POST'])
def updateImage(request):
    return Settings.update_image(None, request,app)

@api_view(['GET', 'POST'])
def updateDarkmode(request):
    return Settings.update_darkmode(None, request,app)

@api_view(['GET', 'POST'])
def updateUsername(request):
    return Settings.update_username(None, request,app)

@api_view(['GET', 'POST'])
def updateTracking(request):
    return Settings.update_tracking(None, request,app)

@api_view(['GET', 'POST'])
def updatePassword(request):
    return Settings.update_password(None, request,app)

@api_view(['GET', 'POST'])
def updateEmail(request):
    return Settings.update_email(None, request,app)

@api_view(['GET', 'POST'])
def getSettings(request):
    return Settings.get_settings(None, request,app)
