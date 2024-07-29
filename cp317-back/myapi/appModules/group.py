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


def userExists(email, db): #private helper function frfr
    user = db.collection('accountInfo').where('email', '==', email).get()
    if not user:
        return False
    return True


def groupExists(group_id, db): #private function frfr
    group = db.collection('groups').document(group_id).get()
    if not group.exists:
        return False
    return True


def newGroup(request, app):  # TODO implement
    db = firestore.client(app)
    name = request.data['name']
    token = request.data['token']
    if not userExists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=418)
    elif groupExists(name, db):
        return Response({'message': "Group already exists"}, status=418)
    else:
        group = db.collection('groups').add({'name': name, 'members': [token]})
        user = db.collection('accountInfo').document(token)
        user.set({'groups': group}, merge=True)
        return Response({'message': "Group created", 'name': name}, status=200)


def addUserToGroup(request, app):  # TODO implement
    db = firestore.client(app)
    name = request.data['name']  # group name to join
    token = request.data['token']  # user to add

    if not userExists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=418)
    elif not groupExists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        user = db.collection('accountInfo').document(token)
        user.set({'groups': group}, merge=True)
        group.update({'members': group.get('members').append(token)})
        return Response({'message': "User added to group", 'name': name}, status=200)


def removeUserFromGroup(request, app):  # TODO implement
    db = firestore.client(app)
    name = request.data['name']  # group name to leave
    token = request.data['token']  # user to add

    if not userExists(token, db):
        return Response({'message': "User does not exist or you are not authenticated"}, status=418)
    elif not groupExists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        user = db.collection('accountInfo').document(token)
        user.set({'groups': None}, merge=True)
        group.update({'members': group.get('members').remove(token)})
        return Response({'message': "User removed from group", 'name': name}, status=200)


def getGroup(request, app):  # TODO implement
    db = firestore.client(app)
    return Response({'message': "Not implemented yet"}, status=501)
    name = request.data['name']
    if not groupExists(name, db):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        return Response({'message': group.to_dict()}, status=200)
