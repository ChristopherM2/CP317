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


def newGroup(request, app):  # TODO implement
    db = firestore.client(app)
    return Response({'message': "Not implemented yet"}, status=501)


def addUserToGroup(request, app):  # TODO implement
    db = firestore.client(app)
    return Response({'message': "Not implemented yet"}, status=501)


def removeUserFromGroup(request, app):  # TODO implement
    db = firestore.client(app)
    return Response({'message': "Not implemented yet"}, status=501)


def getGroup(request, app):  # TODO implement
    db = firestore.client(app)
    return Response({'message': "Not implemented yet"}, status=501)
