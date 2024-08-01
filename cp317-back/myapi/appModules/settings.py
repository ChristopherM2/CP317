import datetime
from typing import Any

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

    def default_settings(self, token):
        meow.update_db('accountInfo', token, default_settings)
        return default_settings

    def get_settings(self, request):
        """
        Get the settings for the user returns http response
        """
        try:
            if 'token' not in request.GET:
                return Response({'message': 'No user id provided'}, status=400)
            if not meow.get_data('accountInfo', request.GET.get('token')):
                return Response({'message': 'User not found'}, status=404)
            user_id = request.GET.get('token')
            user_settings = meow.get_data('accountInfo', user_id).get('settings')

            return Response(user_settings, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_email(self, request):
        """
        Update the email of the user
        """
        try:
            user_id = request.GET.get('token')
            email = request.GET.get('email')

            meow.update_db('creds', user_id, {'email': email})

            return Response({'message': 'Email updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_image(self, request):  #TODO allow for image upload not just urls
        """
        Update the image of the user
        """
        try:
            user_id = request.GET.get('token')
            image = request.GET.get('image')
            setting = meow.get_data('accountInfo', user_id).get('settings')
            setting['image'] = image
            meow.update_db('accountInfo', user_id, {'setting': setting})

            return Response({'message': 'Image updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_darkmode(self, request):
        """
        Update the darkmode of the user
        """
        try:
            user_id = request.GET.get('token')
            darkmode = request.GET.get('darkmode')
            setting = meow.get_data('accountInfo', user_id).get('settings')
            setting['darkmode'] = darkmode
            meow.update_db('accountInfo', user_id, {'setting': setting})
            return Response({'message': 'Darkmode updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_username(self, request):
        """
        Update the username of the user
        """
        try:
            user_id = request.GET.get('token')
            username = request.GET.get('username')

            settings = meow.get_data('users', user_id).get('settings')
            settings['username'] = username
            meow.update_db('accountInfo', user_id, {'settings': settings})
            return Response({'message': 'Username updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_tracking(self, request):
        """
        Update the tracking of the user
        """
        try:
            user_id = request.GET.get('token')
            tracking = request.GET.get('tracking')

            settings = meow.get_data('accountInfo', user_id).get('settings')
            settings['tracking'] = tracking
            meow.update_db('accountInfo', user_id, {'settings': settings})
            return Response({'message': 'Tracking updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    def update_password(self, request):
        """
        Update the password of the user
        """
        try:
            user_id = request.GET.get('token')
            password = request.GET.get('password')

            hashed = hashpw(password.encode('utf-8'), gensalt())

            meow.update_db('creds', user_id, {'password': hashed})
            return Response({'message': 'Password updated'}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)
