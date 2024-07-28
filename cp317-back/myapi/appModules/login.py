# meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt


def loginreqs(request):
    cred = credentials.Certificate("cp317-back/serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    users_ref = db.collection('creds')
    if request.method == 'POST':
        email = request.data['email']
        password = request.data['password']
        user = users_ref.where('email', '==', email).get()
        if bcrypt.checkpw(password, user[0].to_dict()['password']):
            return Response({'message': "Login Successful", 'id': user.id}, status=200)
        else:
            return Response({'message': "Login Failed"}, status=401)



def signupreqs(request):
    cred = credentials.Certificate("cp317-back/serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client()
    users_ref = db.collection('creds')
    if request.method == 'POST':
        email = request.data['email']
        password = request.data['password']
        user = users_ref.where('email', '==', email).get()
        if user:
            return Response({'message': "User already exists"}, status=400)
        else:
            user = users_ref.add({
                'email': email,
                'password': bcrypt.hashpw(password, bcrypt.gensalt())
            })
            return Response({'message': "User created", 'id': user.id}, status=201)


