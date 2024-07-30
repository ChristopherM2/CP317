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

        user = users_ref.document(request.data['token']).get()
        if user.exists:
            return Response({'message': user.to_dict()}, status=200)
        else:
            return Response({'message': "User does not exist"}, status=498)
