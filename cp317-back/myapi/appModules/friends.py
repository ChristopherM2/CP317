import traceback

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import datetime

#from google.cloud import firestore


class friend:
    def __init__(self) -> None:
        pass

    """
    -------------------------------------------------------
    Add or remove friends using HTTP POST OR DELETE respectively
    -------------------------------------------------------
    Parameters:
        1- Http request 
    Returns:
        Http response with a message and status code (200 OK or 418 I'm a teapot (error) or 405 Method Not Allowed)
    -------------------------------------------------------
    """

    """
    If the request is a POST request, the user will be added to the friend list of the user with the token
    If the request is a DELETE request, the user will be removed from the friend list of the user with the token
    
    The respective friend will also be updated with the user's public token in their followers list
    """

    def friends(self, request, app):
        try:
            db = firestore.client(app)
        except Exception as e:
            print(traceback.format_exc())
            return Response({'message': str(e)}, status=502)

        if request.method == 'POST':
            try:
                user_id = request.data['token']
                userPublicToken = db.collection('accountInfo').document(user_id).get().to_dict()['publicToken']
                friendToken = request.data['friendPublicToken']
                db.collection('accountInfo').document(user_id).update({'following': firestore.ArrayUnion([friendToken])})
                friendID = db.collection('accountInfo').where('publicToken', '==', friendToken).get()[0].id
                db.collection('accountInfo').document(friendID).update({'followers': firestore.ArrayUnion([userPublicToken])})


                return Response({'message': 'Friend added'}, status=200)
            except Exception as e:
                return Response({'message': str(e)}, status=500)
        # http uses DELETE to remove a friend
        elif request.method == 'DELETE':
            try:
                user_id = request.data['token']
                userPublicToken = db.collection('accountInfo').document(user_id).get().to_dict()['publicToken']
                friendToken = request.data['friendPublicToken']
                db.collection('accountInfo').document(user_id).update(
                    {'following': firestore.ArrayRemove([friendToken])})
                friendID = db.collection('accountInfo').where('publicToken', '==', friendToken).get()[0].id
                db.collection('accountInfo').document(friendID).update(
                    {'followers': firestore.ArrayRemove([userPublicToken])})



                return Response({'message': 'Friend removed'}, status=200)
            except Exception as e:
                return Response({'message': str(e)}, status=500)
        else:
            return Response({'message': 'Method not allowed'}, status=405)

