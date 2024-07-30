import traceback

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


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

    def friends(request, app):  # TODO implement
        db = firestore.client(app)
        if request.method == 'POST':
            try:
                users_ref = db.collection('accountInfo')
                user_id = request.data['token']
                friend_email = request.data['friend_email']
                user = db.collection('accountInfo').document(user_id)
                friend = db.collection('accountInfo').where('email', '==', friend_email).get()[0]
                if friend:
                    friend = friend.reference
                else:
                    return Response({'message': "User does not exist"}, status=498)
                user.update({
                    'following': user.get('following').append(friend)
                })
                friend.update({
                    'followers': friend.get('followers').append(user)
                })
            except Exception as e:
                return Response({'message': "Invalid request, missing fields :(((("}, status=418)

            return Response({'message': "Successfully started following the user"}, status=200)
        elif request.method == 'DELETE':
            users_ref = db.collection('accountInfo')
            try:
                users_ref = db.collection('accountInfo')
                user_id = request.data['token']
                friend_id = request.data['friend_id']
                user = users_ref.document(user_id)
                friend = users_ref.document(friend_id)
                user.update({
                    'following': user.get('following').remove(friend)
                })
                friend.update({
                    'followers': friend.get('followers').remove(user)
                })
                return Response({'message': "No longer following"}, status=200)
            except Exception as e:
                return Response({
                    'message': "Invalid request, missing fields  or some other error happened:((((" + traceback.format_exc()},
                    status=418)

        else:
            return Response({'message': "Please use POST or DELETE methods"}, status=405)
