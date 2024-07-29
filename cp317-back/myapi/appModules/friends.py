from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

def friends(request): #TODO implement
    return Response({'message': "test"})