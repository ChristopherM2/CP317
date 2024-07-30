import datetime

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

"""
-------------------------------------------------------
Create a group using HTTP request add user to group or remove user from group etc
Use: variable = methodname(params)
-------------------------------------------------------
Parameters:
    1- http request
Returns:
    http response
-------------------------------------------------------
"""


def userexists(token, app):  # private helper function frfr //works
    db = firestore.client(app)
    user = db.collection('accountInfo').document(token).get()

    if not user:
        return False
    return True


def groupexists(token, app):  # private function frfr //works
    db = firestore.client(app)
    group = db.collection('groups').document(token).get()
    print(group.exists)
    if not group.exists:
        return False
    return True


def newgroup(request, app):  # verified to work
    db = firestore.client(app)

    name = request.data['name']
    token = request.data['token']
    if not userexists(token, app):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif groupexists(name, app):
        return Response({'message': "Group already exists"}, status=418)
    elif userinGroup(token, app):
        return Response({'message': "Your in a group already please leave"}, status=403)
    else:
        group = db.collection('groups').document(name).set(
            {'members': [token], 'admin': token, 'messages': [], 'tasks': []})

        user = db.collection('accountInfo').document(token)
        user.set({'groups': name}, merge=True)
        return Response({'message': "Group already exists"}, status=200)


def addusertogroup(request, app):  # Verified to work
    db = firestore.client(app)
    name = request.data['name']  # group name to join
    token = request.data['token']  # user to add

    if not userexists(token, app):
        print(498)
    elif not groupexists(name, app):
        print(4180)
    elif userinGroup(token, app):
        print(403)
    else:
        group_ref = db.collection('groups').document(name)
        user_ref = db.collection('accountInfo').document(token)

        try:
            group_doc = group_ref.get()
            if group_doc.exists:
                group_data = group_doc.to_dict()
                currentMembers = group_data.get('members', [])

                # Ensure token is not already in currentMembers to avoid duplicates
                if token not in currentMembers:
                    currentMembers.append(token)

                    # Update the user's group
                    user_ref.set({'group': name}, merge=True)

                    # Update the group's members
                    group_ref.update({'members': currentMembers})

                    print(200)
                else:
                    print(403)  # User already in group
            else:
                print(418)  # Group does not exist
        except Exception as e:
            print(f"Error updating group: {e} :((((")


def removeuserfromGroup(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']  # group name to leave
    token = request.data['token']  # user to add

    if not userexists(token, app):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif not groupexists(name, app):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        user = db.collection('accountInfo').document(token)
        user.set({'groups': None}, merge=True)
        group.update({'members': group.get('members').remove(token)})
        return Response({'message': "User removed from group", 'name': name}, status=200)


def getgroup(request, app):  # TODO Verify it works
    db = firestore.client(app)

    name = request.data['name']
    if not groupexists(name, app):
        return Response({'message': "Group does not exist"}, status=418)
    else:
        group = db.collection('groups').where('name', '==', name).get()
        return Response({'message': group}, status=200)


def sendmessage(request, app):  # TODO Verify it works
    db = firestore.client(app)
    group = db.collection('groups').document(request.data['name'])
    message = request.data['message']
    group.update({'messages': group.get('messages').append(
        {'message': message, 'time': datetime.time, 'sender': request.data['token']})})
    return Response({'message': "Message sent"}, status=200)


def addtask(request, app):  # TODO Verify it works
    db = firestore.client(app)

    group = db.collection('groups').document(request.data['name'])
    if not group:
        return Response({'message': "Group does not exist"}, status=418)
    task = request.data['task']
    group.update({'tasks': group.get('tasks').append(
        {'task': task, 'completed': False, 'time': datetime.time, 'User': request.data['token']})})
    return Response({'message': "Task added"}, status=200)


def gettasks(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, app):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('tasks')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getgroupmembers(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, app):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('members')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def updatemembercompletion(request, app):  # TODO Verify it works
    return Response({'message': "TODO"}, status=501)


def getmessages(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, app):
        group = db.collection('groups').document(name)
        return Response({'message': group.get('messages')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getcompletedtasks(request, app):  # TODO Verify it works
    db = firestore.client(app)

    return Response({'message': "TODO"}, status=501)


def userinGroup(token, app):
    db = firestore.client(app)
    user = db.collection('accountInfo').document(token).get()
    if not user:
        return False
    try:
        if user.get('groups') is not None:
            return True
    except Exception as e:
        return False


if __name__ == '__main__':  # edit this method to test the functions
    # copy and paste the code from the function you want to test
    # replace name and token etc with test data since we cant replicate http requests or atleast not easily yk
    cred = credentials.Certificate("serviceAccountKey.json")
    app = firebase_admin.initialize_app(cred)
    db = firestore.client(app)
    name = 'test'  # group name to join
    token = 'CMCe5O1Ury6UEC3qzWCJ'  # user to add

    if not userexists(token, app):
        print(498)
    elif not groupexists(name, app):
        print(4180)
    elif userinGroup(token, app):
        print(403)
    else:
        group_ref = db.collection('groups').document(name)
        user_ref = db.collection('accountInfo').document(token)

        try:
            group_doc = group_ref.get()
            if group_doc.exists:
                group_data = group_doc.to_dict()
                currentMembers = group_data.get('members', [])

                # Ensure token is not already in currentMembers to avoid duplicates
                if token not in currentMembers:
                    currentMembers.append(token)

                    # Update the user's group
                    user_ref.set({'group': name}, merge=True)

                    # Update the group's members
                    group_ref.update({'members': currentMembers})

                    print(200)
                else:
                    print(403)  # User already in group
            else:
                print(418)  # Group does not exist
        except Exception as e:
            print(f"Error updating group: {e} :((((")