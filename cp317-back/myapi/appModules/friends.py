from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("serviceAccountKey.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()


def friends(request):  # TODO implement
    if request.method == 'POST':

        return Response({'message': "Successfully started following the user"}, status=200)
    elif request.method == 'DELETE':
        return Response({'message': "No longer following"}, status=200)
    else:
        return Response({'message': "Please use POST or DELETE methods"}, status=405)
