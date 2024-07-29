from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def getuser(request):
    users_ref = db.collection('accountInfo')
    user = users_ref.document(request.data['user_id']).get()
    if user.exists:
        return Response({'message': user.to_dict()}, status=200)
    else:
        return Response({'message': "User does not exist"}, status=418)
