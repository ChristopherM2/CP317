# meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def loginreqs(request):
    print(request.data)
    users_ref = db.collection('creds')
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
    users_ref = db.collection('creds')
    print(request.data)

    if request.method == 'POST':
        email = request.data.get('username')
        password = request.data.get('password')

        if not email or not password:
            return Response({'message': "Missing username or password"}, status=400)

        password = password.encode('utf-8')
        user = users_ref.where('email', '==', email).get()

        if user:
            print(user[0].to_dict())
            print(user[0].id)
            return Response({'message': "User already exists\n (im a teapot)"}, status=418)
        else:
            hashed = bcrypt.hashpw(password, bcrypt.gensalt())
            new_user = {
                'email': email,
                'password': hashed.decode('utf-8')  # Store password as string
            }
            user_ref = users_ref.add(new_user)

            # Check for duplicates
            duplicate_user = users_ref.where('email', '==', email).get()
            if len(duplicate_user) > 1:
                users_ref.document(duplicate_user[1].id).delete()

            return Response({'message': "User created", 'id': str(user_ref[1].id)}, status=201)
