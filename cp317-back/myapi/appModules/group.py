import datetime

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

"""
-------------------------------------------------------
Create a group using HTTP request add user to group or remove user from group etc
Use: variable = methodname(params)
-------------------------------------------------------
Parameters:
    1- http request
Returns:
    http response
-------------------------------------------------------
"""


def userexists(token, app):  # private helper function frfr
    db = firestore.client(app)
    user = db.collection('accountInfo').document(token).get()
    if not user:
        return False
    return True


def groupexists(group_id, app):  # private function frfr
    db = firestore.client(app)
    group = db.collection('groups').document(group_id).get()
    if not group.exists:
        return False
    return True


def newgroup(request, app): #verified to work
    db = firestore.client(app)

    name = request.data['name']
    token = request.data['token']
    if not userexists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif groupexists(name, db):
        return Response({'message': "Group already exists"}, status=418)
    else:
        group = db.collection('groups').add(
            {'name': name, 'members': [token], 'admin': token, 'messages': [], 'tasks': []})
        user = db.collection('accountInfo').document(token)
        user.set({'groups': group}, merge=True)
        return Response({'message': "Group created", 'name': name}, status=200)


def addusertogroup(request, app): #TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']  # group name to join
    token = request.data['token']  # user to add

    if not userexists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif not groupexists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        user = db.collection('accountInfo').document(token)
        user.set({'groups': group}, merge=True)
        group.update({'members': group.get('members').append(token)})
        return Response({'message': "User added to group", 'name': name}, status=200)


def removeuserfromGroup(request, app):#TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']  # group name to leave
    token = request.data['token']  # user to add

    if not userexists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif not groupexists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        user = db.collection('accountInfo').document(token)
        user.set({'groups': None}, merge=True)
        group.update({'members': group.get('members').remove(token)})
        return Response({'message': "User removed from group", 'name': name}, status=200)


def getgroup(request, app): #TODO Verify it works
    db = firestore.client(app)

    name = request.data['name']
    if not groupexists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        return Response({'message': group}, status=200)


def sendmessage(request, app):#TODO Verify it works
    db = firestore.client(app)
    group = db.collection('groups').document(request.data['name'])
    message = request.data['message']
    group.update({'messages': group.get('messages').append(
        {'message': message, 'time': datetime.time, 'sender': request.data['token']})})
    return Response({'message': "Message sent"}, status=200)


def addtask(request, app):#TODO Verify it works
    db = firestore.client(app)

    group = db.collection('groups').document(request.data['name'])
    if not group:
        return Response({'message': "Group does not exist"}, status=418)
    task = request.data['task']
    group.update({'tasks': group.get('tasks').append(
        {'task': task, 'completed': False, 'time': datetime.time, 'User': request.data['token']})})
    return Response({'message': "Task added"}, status=200)


def gettasks(request, app):#TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, db):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('tasks')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getgroupmembers(request, app):#TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, db):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('members')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def updatemembercompletion(request, app):#TODO Verify it works
    return Response({'message': "TODO"}, status=501)


def getmessages(request, app):#TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, db):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('messages')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getcompletedtasks(request, app):#TODO Verify it works
    db = firestore.client(app)

    return Response({'message': "TODO"}, status=501)


if __name__ == '__main__':#edit this method to test the functions
    # copy and paste the code from the function you want to test
    # replace name and token etc with test data since we cant replicate http requests or atleast not easily yk
    cred = credentials.Certificate("serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client(app)

    name = 'test'
    token = 'CMCe5O1Ury6UEC3qzWCJ'
    if not userexists(token, app):
        print('498')
    elif groupexists(name, app):
        print(418)
    else:
        group = db.collection('groups').add(
            {'name': name, 'members': [token], 'admin': token, 'messages': [], 'tasks': []})
        user = db.collection('accountInfo').document(token)
        user.set({'groups': group}, merge=True)
        print(200)
