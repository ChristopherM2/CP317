#meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


def loginreqs(request):
    cred = credentials.Certificate("cp317-back/serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    users_ref = db.collection('creds')

    return Response({'message': "test"})

def signupreqs(request):
    cred = credentials.Certificate("cp317-back/serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    users_ref = db.collection('creds')

    return Response({'message': "test"})