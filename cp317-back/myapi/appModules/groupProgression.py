from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from group import group


class groupProgression:
    def __init__(self) -> None:
        pass
    
    def calculateEXP(self,request,app):
        db = firestore.client(app)
        name = request.data['name']
        if group.groupexists(name,app):
            mygroup = db.collection('groups').document(name)
            mygroupdata = mygroup.get().to_dict()
            exp = len(mygroupdata.get('completedTasks')) * 10
            #exp algo should be here
            mygroupdata.update({
                'EXP':exp
            })

            if exp > 100:
                self.addLevel(request,app)
            if exp < 0:
                self.removeLevel(request,app)

            return Response({'message': "EXP updated"}, status=200)
        else:

            return Response({'message': "Group does not exist"}, status=404)




    def addLevel(self,request,app):
        db = firestore.client(app)
        name = request.data['name']
        if group.groupexists(name,app):
            mygroup = db.collection('groups').document(name)
            mygroupdata = mygroup.get().to_dict()
            level = mygroupdata.get('level')

            mygroup.update({
                'level': level + 1,
                'EXP':0
                })
            return Response({'messageg': "level increased!"}, status=200)
        
        else:
            return Response({'message': "Group does not exist"}, status=418)

    def removeLevel(self,request,app):
        db = firestore.client(app)
        name = request.data['name']
        if group.groupexists(name,app):
            mygroup = db.collection('groups').document(name)
            mygroupdata = mygroup.get().to_dict()
            level = mygroupdata.get('level')

            mygroup.update({
                'level': level - 1,
                'EXP':0
                })

            return Response({'messageg': "level increased!"}, status=200)
        
        else:
            return Response({'message': "Group does not exist"}, status=418)