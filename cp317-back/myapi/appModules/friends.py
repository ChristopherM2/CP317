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

    def friends(self, request, app):  # TODO implement
        db = firestore.client(app)
        if request.method == 'POST':
            try:
                users_ref = db.collection('accountInfo')
                user_id = request.data['token']
                friend_email = request.data['email']
                user = db.collection('accountInfo').document(user_id)
                friend = db.collection('accountInfo').where('email', '==', friend_email).get()[0].id
                if not friend:
                    return Response({'message': "User does not exist"}, status=498)
                user.update({
                    'following': user.get('following').to_dict().get('following').append({'email': friend_email, 'pfp': db.collection('accountInfo').document(friend).get().to_dict().get('settings').get('image') })
                })
                db.collection('accountInfo').document(friend).update({
                    'followers': db.collection('accountInfo').document(friend).get('followers').to_dict().get('followers').append({'username': user.get('email'), 'pfp': user.get('settings').get('image')})
                })

            except Exception as e:
                return Response({'message': "Invalid request, missing fields :(((("}, status=418)

            return Response({'message': "Successfully started following the user"}, status=200)
        elif request.method == 'DELETE':
            users_ref = db.collection('accountInfo')
            try:
                users_ref = db.collection('accountInfo')
                user_id = request.data['token']
                friend_id = request.data['email']
                user = users_ref.document(user_id)
                friend = users_ref.document(friend_id)
                user.update({
                    'following': user.get('following').to_dict().get('following').remove({'email': friend.get('email'), 'pfp': friend.get('settings').get('image')})
                })
                friend.update({
                    'followers': friend.get('followers').to_dict().get('followers').remove({'email': user.get('email'), 'pfp': user.get('settings').get('image')})
                })

                return Response({'message': "No longer following"}, status=200)
            except Exception as e:
                return Response({
                    'message': "Invalid request, missing fields  or some other error happened:((((" + traceback.format_exc()},
                    status=418)

        else:
            return Response({'message': "Please use POST or DELETE methods"}, status=405)
