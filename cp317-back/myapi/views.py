from django.utils import dateformat, timezone
from rest_framework.decorators import api_view

from .appModules.group import *
from .appModules.login import *
from .appModules.settings import *
from .appModules.user import *

from .appModules.friends import *

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
"private info for firebase"
cred = credentials.Certificate("serviceAccountKey.json")
"initialize firebase"
app = firebase_admin.initialize_app(cred)


"""this is basically a router for the api

 urls.py will call these methods when a request is made to the server
 the methods will then call the respective methods in the appModules"""
@api_view(['GET', 'POST'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'}, status=200)
@api_view(['GET', 'POST'])
def getGroup(request):
    return group.getGroup(None, request, app)

@api_view(['GET', 'POST'])
def get_user(request):
    return user.getUser(None, request, app)


@api_view(['GET', 'POST'])
def get_public_user(request):
    return user.getPublicUser(None, request, app)


@api_view(['GET', 'POST'])
def find_public_token(request):
    return user.findPublicToken(None, request, app)


@api_view(['POST', 'GET'])
def login(request):
    return Login.loginReqs(None, request, app)


@api_view(['GET', 'POST'])
def signup(request):
    login = Login()
    return Login.signupReqs(None, request, app)


@api_view(['POST', 'DELETE'])
def friends(request):
    return friend.friends(None, request, app)


@api_view(['GET', 'POST'])
def new_group(request):
    return group.newGroup(None, request, app)


@api_view(['POST'])
def add_user_to_group(request):
    return group.addUserToGroup(None, request, app)


@api_view(['DELETE', 'POST'])
def remove_user_from_group(request):
    return group.removeUserFromGroup(None, request, app)


@api_view(['GET', 'POST'])
def get_group(request):
    return group.getGroup(None, request, app)


@api_view(['GET', 'POST'])
def current_time(request):
    now = dateformat.format(timezone.now(), 'Y-m-d H:i:s')
    return Response({'time': str(now)})


@api_view(['GET', 'POST'])
def sendMessage(request):
    return group.sendMessage(None, request, app)


@api_view(['GET', 'POST'])
def addTask(request):
    return group.addTask(None, request, app)


@api_view(['GET', 'POST'])
def getTasks(request):
    return group.getTasks(None, request, app)


@api_view(['GET', 'POST'])
def getMessages(request):
    return group.getMessages(None, request, app)


@api_view(['GET', 'POST'])
def completetask(request):
    return group.completeTask(None, request, app)


@api_view(['GET', 'POST'])
def getCompletedTasks(request):
    return group.getCompletedTasks(None, request, app)


@api_view(['GET', 'POST'])
def getGroupMembers(request):
    return group.getGroupMembers(None, request, app)


@api_view(['GET', 'POST'])
def updateMemberCompletion(request):
    return group.updateMemberCompletion(None, request, app)


@api_view(['GET', 'POST'])
def updateImage(request):
    return Settings.updateImage(None, request, app)


@api_view(['GET', 'POST'])
def updateDarkmode(request):
    return Settings.updateDarkmode(None, request, app)


@api_view(['GET', 'POST'])
def updateUsername(request):
    return Settings.updateUsername(None, request, app)


@api_view(['GET', 'POST'])
def updateTracking(request):
    return Settings.updateTracking(None, request, app)


@api_view(['GET', 'POST'])
def updatePassword(request):
    return Settings.updatePassword(None, request, app)


@api_view(['GET', 'POST'])
def updateEmail(request):
    return Settings.updateEmail(None, request, app)


@api_view(['GET', 'POST'])
def getSettings(request):
    return Settings.getSettings(None, request, app)


@api_view(['GET', 'POST'])
def getAvailableGroups(request):
    return group.getAvailableGroups(None, request, app)
