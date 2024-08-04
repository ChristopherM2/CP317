import datetime
from typing import Any

import bcrypt
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from bcrypt import hashpw, gensalt, checkpw





class Settings:
    default_settings = {
        'image': 'https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb',
        'darkmode': False,
        'username': 'username',
        'tracking': False
    }
    def __init__(self):

        pass

    def defaultSettings(self, token,app) -> Any:
        """ Sets the default settings for the user
        Called when a new user is created
        """

        db = firestore.client(app)
        self.default_settings.update({'username': db.collection('accountInfo').document(token).get().to_dict().get('email')})
        db.collection('accountInfo').document(token).set({'settings': self.default_settings}, merge=True)

        return

    def getSettings(self, request,app):
        """
        Get the settings for the user returns http response
        """
        try:
            db = firestore.client(app)
            user_id = request.data['token']
            user_settings = db.collection('accountInfo').document(user_id).get().to_dict().get('settings')

            return Response(user_settings, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def updateEmail(self, request,app):
        """
        Update the email of the user
        """
        try:
            user_id = request.data['token']
            email = request.data['email']
            db = firestore.client(app)
            db.collection('creds').document(user_id).set({'email': email}, merge=True)
            db.collection('accountInfo').document(user_id).set({'email': email}, merge=True)

            return Response({'message': 'Email updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def updateImage(self, request,app):
        """
        Update the image of the user
        """
        try:
            db = firestore.client(app)
            user_id = request.data['token']
            image = request.data['image']
            setting = db.collection('accountInfo').document(user_id).get().to_dict().get('settings')
            setting['image'] = image
            db.collection('accountInfo').document(user_id).set({'settings': setting}, merge=True)

            return Response({'message': 'Image updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def updateDarkmode(self, request,app):
        """
        Update the darkmode of the user
        """
        try:
            db = firestore.client(app)
            user_id = request.data['token']
            darkmode = request.data['darkmode']
            setting = db.collection('accountInfo').document(user_id).get().to_dict().get('settings')
            setting['darkmode'] = darkmode
            db.collection('accountInfo').document(user_id).set({'settings': setting}, merge=True)
            return Response({'message': 'Darkmode updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def updateUsername(self, request,app):
        """
        Update the username of the user
        """

        try:

            db= firestore.client(app)

            user_id = request.data['token']

            username = request.data['username']

            settings = db.collection('accountInfo').document(user_id).get().to_dict().get('settings')
            settings['username'] = username
            db.collection('accountInfo').document(user_id).set({'settings': settings}, merge=True)
            return Response({'message': 'Username updated'}, status=200)
        except Exception as e:
            print(e)
            return Response({'message': str(e)}, status=500)

    def updateTracking(self, request,app):
        """
        Update the tracking of the user
        """
        try:
            db = firestore.client(app)
            user_id = request.data['token']
            tracking = request.data['tracking']

            settings = db.collection('accountInfo').document(user_id).get().to_dict().get('settings')
            settings['tracking'] = tracking
            db.collection('accountInfo').document(user_id).set({'settings': settings}, merge=True)
            return Response({'message': 'Tracking updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def updatePassword(self, request,app):
        """
        Update the password of the user
        """
        try:

            db = firestore.client(app)

            user_id = request.data['token']

            email = db.collection('accountInfo').document(user_id).get().to_dict().get('email')

            password = request.data['password']
            password = password.encode('utf-8')

            hashed = hashpw(password, gensalt())

            db.collection('creds').document(user_id).set({'password': hashed.decode()}, merge=True)

            return Response({'message': 'Password updated'}, status=200)
        except Exception as e:
            print(e)
            return Response({'message': str(e)}, status=500)
