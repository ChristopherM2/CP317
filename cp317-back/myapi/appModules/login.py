# meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt

from .settings import Settings


def random_token():
    import random
    import string
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))


class Login:
    def __init__(self) -> None:
        pass

    """
    -------------------------------------------------------
    Login a user and return a response including the user token
    -------------------------------------------------------
    Parameters:
        1- http request
    Returns:
        http response
    -------------------------------------------------------
    """

    # This function is used to login a user
    """ 
    params: request as http request , app as firebase app
    request should contain email and password
    returns a token which can be used to access the user's data
    """

    def loginReqs(self, request, app):
        db = firestore.client(app)
        users_ref = db.collection('creds')
        if request.method == 'POST' or request.method == 'GET':
            try:
                email = request.data['email']
                password = request.data['password'].encode('utf-8')
            except Exception as e:
                return Response({'message': "Invalid request, missing fields :(((("}, status=418) # 418 <3
            user = users_ref.where('email', '==', email).get()
            if not user:
                return Response({'message': "User does not exist"}, status=401)  # oh no
            password2 = user[0].to_dict()['password'].encode('utf-8')
            if bcrypt.checkpw(password, password2):
                return Response({'message': "Login Successful", 'id': user[0].id}, status=200) # lets go
            else:
                return Response({'message': "Login Failed"}, status=401)# oh no

    """
    
    Creates a new user in the database
    params : request as http request , app as firebase app
    request should contain email and password
    returns a token which can be used to access the user's data 
    """

    def signupReqs(self, request, app):
        db = firestore.client(app)
        users_ref = db.collection('creds')

        if request.method == 'POST':
            email = request.data.get('email')
            password = request.data.get('password')

            if not email or not password:
                return Response({'message': "Missing username or password"}, status=400) #how dare they not provide a email or password

            password = password.encode('utf-8')
            user = users_ref.where('email', '==', email).get()

            if user:
                print(user[0].to_dict())
                print(user[0].id)
                return Response({'message': "User already exists\n (im a teapot)"}, status=418) # why is 418 a such a beautful status code
            else:
                hashed = bcrypt.hashpw(password, bcrypt.gensalt())  #lets not store plaintext passwords
                new_user = {
                    'email': email,
                    'password': hashed.decode('utf-8'),

                }
                user_ref = users_ref.add(new_user)

                # Check for duplicates
                duplicate_user = users_ref.where('email', '==', email).get()
                if len(duplicate_user) > 1:
                    users_ref.document(duplicate_user[1].id).delete()
                account = db.collection('accountInfo').document(duplicate_user[0].id).set({
                    'publicToken': random_token(),
                    'email': email,
                    'followers': [],
                    'following': [],
                    'group': None,
                    'count': 0})
                # remove duplicate
                duplicate_user = users_ref.where('email', '==', email).get()
                # it always does it twice I hate this
                if len(duplicate_user) > 1:
                    users_ref.document(duplicate_user[1].id).delete()
                Settings().defaultSettings(user_ref[1].id, app)
                return Response({'message': "User created", 'id': str(user_ref[1].id)}, status=201) # We did it
