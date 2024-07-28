# meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()
users_ref = db.collection('creds')
def loginreqs(request):
    print(request.data)

    if request.method == 'POST' or request.method == 'GET':
        try:
            email = request.data['username']
            password = request.data['password']
        except Exception as e:
            return Response({'message': "Invalid request, missing fields :(((("}, status=418)
        user = users_ref.where('email', '==', email).get()
        if not user:
            return Response({'message': "User does not exist"}, status=418)
        if bcrypt.checkpw(password, user[0].to_dict()['password']):
            return Response({'message': "Login Successful", 'id': user.id}, status=200)
        else:
            return Response({'message': "Login Failed"}, status=401)


# I love this :3

def signupreqs(request):

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
