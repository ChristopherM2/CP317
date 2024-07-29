import traceback

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def friends(request):  # TODO implement
    if request.method == 'POST':
        try:
            users_ref = db.collection('accountInfo')
            user_id = request.data['user_id']
            friend_id = request.data['friend_id']
            user = db.collection('accountInfo').document(user_id)
            friend = db.collection('accountInfo').document(friend_id)
            user.update({
                'friends': firebase_admin.firestore.ArrayUnion([friend])
            })
            friend.update({
                'followers': firebase_admin.firestore.ArrayUnion([user])
            })
        except Exception as e:
            return Response({'message': "Invalid request, missing fields :(((("}, status=418)


        return Response({'message': "Successfully started following the user"}, status=200)
    elif request.method == 'DELETE':
        users_ref = db.collection('accountInfo')
        try:
            users_ref = db.collection('accountInfo')
            user_id = request.data['user_id']
            friend_id = request.data['friend_id']
            user = users_ref.document(user_id)
            friend = users_ref.document(friend_id)
            user.update({
                'friends': firebase_admin.firestore.ArrayRemove([friend])
            })
            friend.update({
                'followers': firebase_admin.firestore.ArrayRemove([user])
            })
            return Response({'message': "No longer following"}, status=200)
        except Exception as e:
            return Response({'message': "Invalid request, missing fields  or some other error happened:(((("+traceback.format_exc()}, status=418)


    else:
        return Response({'message': "Please use POST or DELETE methods"}, status=405)
