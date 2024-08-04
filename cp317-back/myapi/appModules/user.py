from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class user:
    def __init__(self) -> None:
        pass

    """
    -------------------------------------------------------
    Returns User information from the database
    -------------------------------------------------------
    Parameters:
        1- Http request
            1a- user_id: The user's id (token)
    Returns:
        Http response with a message and status code (200 OK or 418 I'm a teapot (error))
    -------------------------------------------------------
    """

    def getuser(self, request, app):
        db = firestore.client(app)
        users_ref = db.collection('accountInfo')
        token = request.data['token']
        user = users_ref.document(token).get()
        if user.exists:
            return Response({'message': user.to_dict()}, status=200)
        else:
            return Response({'message': "User does not exist"}, status=498)

    def get_public_user(self, request, app):
        try:
            db = firestore.client(app)
            users_ref = db.collection('accountInfo')
            user_id = request.data['friendPublicToken']
            user = users_ref.where('publicToken', '==', user_id).get()[0].to_dict()
            response = {'pfp': user.get('settings').get('image'), 'username': user.get('settings').get('username'),
                        'email': user.get('email'), 'group': user.get('group'), 'count': user.get('count')}
            return Response(response, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def findPublicToken(self, request, app):
        try:
            db = firestore.client(app)
            users_ref = db.collection('accountInfo')
            if 'email' in request.data:
                user_id = request.data['email']
                user = users_ref.where('email', '==', user_id).get()[0].to_dict().get('publicToken')
            elif 'username' in request.data:
                user_id = request.data['username']
                user = users_ref.where('settings.username', '==', user_id).get()[0].to_dict().get('publicToken')


            return Response({'message': user}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

