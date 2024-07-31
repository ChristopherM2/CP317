from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore


class FirebaseConnection:

    def __init__(self):
        cred = credentials.Certificate("serviceAccountKey.json")
        app = firebase_admin.initialize_app(cred)
        db = firestore.client(self.app)

    def getapp(self) -> firebase_admin:
        return self.app

    def get_db(self) -> firestore.client:
        return self.db

    def update_db(self, collection, document, data, optional=True) -> bool:
        try:
            self.db.collection(collection).document(document).update(data, merge=optional)
            return True
        except:
            return False

    def find_data(self, collection, field, value) -> dict:
        try:
            return self.db.collection(collection).where(field, '==', value).get()
        except:
            return None

    def get_data(self, collection, document) -> dict:
        try:
            return self.db.collection(collection).document(document).get().to_dict()
        except:
            return None

    def add_data(self, collection, data) -> bool:
        try:
            self.db.collection(collection).add(data)
            return True
        except:
            return False
