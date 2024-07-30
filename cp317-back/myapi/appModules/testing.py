import datetime

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from .group import *
"""
-------------------------------------------------------
Used to test the API fire
-------------------------------------------------------
Parameters:
    nah
Returns:
    nah
-------------------------------------------------------
"""

if __name__ == '__main__':
    cred = credentials.Certificate("serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client(app)

    # Test the newgroup function

