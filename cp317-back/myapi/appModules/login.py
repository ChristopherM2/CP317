# meow\
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import bcrypt



class login:
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



    def loginreqs(self, request, app):
        db = firestore.client(app)
        print(request.data.get('password'))
        users_ref = db.collection('creds')
        if request.method == 'POST' or request.method == 'GET':
            try:
                email = request.data['email']
                password = request.data['password'].encode('utf-8')
            except Exception as e:
                return Response({'message': "Invalid request, missing fields :(((("}, status=418)
            user = users_ref.where('email', '==', email).get()
            if not user:
                return Response({'message': "User does not exist"}, status=401)
            password2 = user[0].to_dict()['password'].encode('utf-8')
            if bcrypt.checkpw(password, password2):
                return Response({'message': "Login Successful", 'id': user[0].id}, status=200)
            else:
                return Response({'message': "Login Failed"}, status=401)


    """
    -------------------------------------------------------
    Adds a new user to the database and returns a response including the user token
    -------------------------------------------------------
    Parameters:
        1- http request
    Returns:
        http response
    -------------------------------------------------------
    """


    def signupreqs(self, request, app):
        db = firestore.client(app)
        users_ref = db.collection('creds')
        print(request.data)
        # MEOW
        if request.method == 'POST':
            email = request.data.get('email')
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
                    'password': hashed.decode('utf-8'),  # Store password as string

                }
                user_ref = users_ref.add(new_user)

                # Check for duplicates
                duplicate_user = users_ref.where('email', '==', email).get()
                if len(duplicate_user) > 1:
                    users_ref.document(duplicate_user[1].id).delete()
                account = db.collection('accountInfo').document(duplicate_user[0].id).set({
                    'email': email,
                    'followers': [],
                    'following': [],
                    'group': None})
                # remove duplicate
                duplicate_user = users_ref.where('email', '==', email).get()
                # it always does it twice I hate this
                if len(duplicate_user) > 1:
                    print("Deleting duplicate user")
                    users_ref.document(duplicate_user[1].id).delete()

                return Response({'message': "User created", 'id': str(user_ref[1].id)}, status=201)
