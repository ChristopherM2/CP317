import datetime
from typing import Any

import bcrypt
from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from .databaseConnection import *
from bcrypt import hashpw, gensalt, checkpw

meow = FirebaseConnection()
default_settings = {
    'image': 'https://firebasestorage.googleapis.com/v0/b/cp317-69ff0.appspot.com/o/images%2Fdesktop-wallpaper-default-pfp-aesthetic-default-pfp.jpg?alt=media&token=98cdee9b-009c-47b1-a97f-197390691ffb',
    'darkmode': False,
    'username': 'username',
    'tracking': False
}


class Settings:

    def __init__(self):

        pass

    def default_settings(self, token,app) -> Any:
        db = firestore.client(app)
        db.collection('accountInfo').document(token).set({'settings': default_settings}, merge=True)

        return default_settings

    def get_settings(self, request,app):
        """
        Get the settings for the user returns http response
        """
        try:
            db = firestore.client(app)
            if 'token' not in request.GET:
                return Response({'message': 'No user id provided'}, status=400)
            if not meow.get_data('accountInfo', request.GET['token']):
                return Response({'message': 'User not found'}, status=404)
            user_id = request.data['token']
            user_settings = meow.get_data('accountInfo', user_id).get('settings')

            return Response(user_settings, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_email(self, request,app):
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

    def update_image(self, request,app):  #TODO allow for image upload not just urls
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

    def update_darkmode(self, request,app):
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

    def update_username(self, request,app):
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

    def update_tracking(self, request,app):
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

    def update_password(self, request,app):
        """
        Update the password of the user
        """
        try:
            db = firestore.client(app)
            user_id = request.data['token']
            email = db.collection('accountInfo').document(user_id).get().to_dict().get('email')
            password = request.data['password']

            hashed = hashpw(password, gensalt())

            db.collection('creds').document(user_id).set({'password': hashed.decode('utf-8')}, merge=True)

            return Response({'message': 'Password updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)
