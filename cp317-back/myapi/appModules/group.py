import datetime

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from databaseConnection import FirebaseConnection

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
meow = FirebaseConnection()


class group:
    groupID = ''
    groupName = ''

    def __init__(self, groupID, groupName, description, totalContrs=0):
        self.groupID = groupID
        self.groupName = groupName
        self.description = description
        self.totalContrs = totalContrs
        pass

    def userexists(token, app):  # private helper function frfr //works
        db = firestore.client(app)

        user = meow.get_data('accountInfo', token)
        if not user:
            return False
        return True

    def groupexists(token, app):  # private function frfr //works
        db = firestore.client(app)
        group = meow.get_data('groups', token)
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

        group = meow.set_data('groups', name, {'members': [token], 'admin': token, 'messages': [], 'tasks': []})

        meow.update_db('accountInfo', token, {'group': name})
        return Response({'message': "Group created frfr"}, status=200)


def addusertogroup(request, app):  # Verified to work
    db = firestore.client(app)
    name = request.data['name']  # group name to join
    token = request.data['token']  # user to add

    if not userexists(token, app):
        return Response({'message': "User does not exist or you are not authenticated"}, status=498)
    elif not groupexists(name, app):
        return Response({'message': "Group does not exist"}, status=418)
    elif userinGroup(token, app):
        return Response({'message': "Your in a group already please leave"}, status=403)
    else:

        try:

            currentMembers = meow.get_data('groups', name).get('members')

            # Ensure token is not already in currentMembers to avoid duplicates
            if token not in currentMembers:
                currentMembers.append(token)

                # Update the user's group

                meow.update_db('accountInfo', token, {'group': name})

                # Update the group's members

                meow.update_db('groups', name, {'members': currentMembers})

                return Response({'message': "User added to group", 'name': name}, status=200)
            else:
                return Response({'message': "Error", 'name': name}, status=400)

        except Exception as e:
            print(f"Error updating group: {e} :((((")


def removeuserfromGroup(request, app):  # 97% sure it works
    db = firestore.client(app)
    name = request.data['name']  # group name to leave
    token = request.data['token']  # user to add

    if not userexists(token, app):
        print("return Response({'message': 'User does not exist or you are not authenticated'}, status=498)")
    elif not groupexists(name, app):
        print("return Response({'message': 'Group does not exist'}, status=418)")
    else:

        try:

            currentMembers = meow.get_data('groups', name).get('members')
            if meow.get_data('groups', name).get('admin') == token:
                return Response({'message': 'Admin cannot leave the group'}, status=403)
            # Remove the user token from the members list if it exists
            if token in currentMembers:
                currentMembers.remove(token)

                # Update the user's groups to None or remove the group name

                meow.update_db('accountInfo', token, {'group': None})

                # Update the group's members

                meow.update_db('groups', name, {'members': currentMembers})

                return Response({'message': 'User removed from the group successfully'}, status=200)
            else:
                return Response({'message': 'User not in the group'}, status=403)

        except Exception as e:
            return Response({'message': 'Error updating group: {e}'}, status=500)


def getgroup(request, app):  # TODO Verify it works

    name = request.data['name']
    if not groupexists(name, app):
        return Response({'message': "Group does not exist"}, status=418)
    else:

        group = meow.get_data('groups', name)
        return Response({'message': group}, status=200)


def sendmessage(request, app):  # TODO Verify it works
    group = meow.get_data('groups', request.data['name'])
    message = request.data['message']
    meow.update_db('groups', request.data['name'], {'messages': group.get('messages').append(
        {'message': message, 'time': datetime.time, 'User': request.data['token']})})
    return Response({'message': "Message sent"}, status=200)


def addtask(request, app):  # TODO Verify it works

    group = meow.get_data('groups', request.data['name'])
    if not group:
        return Response({'message': "Group does not exist"}, status=418)
    task = request.data['task']

    meow.update_db('groups', request.data['name'], {'tasks': group.get('tasks').append(
        {'task': task, 'completed': False, 'User': request.data['token']})})
    return Response({'message': "Task added"}, status=200)


def gettasks(request, app):  # TODO Verify it works

    name = request.data['name']
    if groupexists(name, app):

        group = meow.get_data('groups', name)
        return Response({'message': group.get('tasks')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getgroupmembers(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, app):
        group = meow.get_data('groups', name)
        return Response({'message': group.get('members')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def updatemembercompletion(request, app):  # TODO Verify it works
    return Response({'message': "TODO"}, status=501)


def getmessages(request, app):  # TODO Verify it works
    db = firestore.client(app)
    name = request.data['name']
    if groupexists(name, app):
        group = meow.get_data('groups', name)
        return Response({'message': group.get('messages')}, status=200)
    else:
        return Response({'message': "Group does not exist"}, status=418)


def getcompletedtasks(request, app):  # TODO Verify it works
    db = firestore.client(app)

    return Response({'message': "TODO"}, status=501)


def userinGroup(token, app):
    user = meow.get_data('accountInfo', token)
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
    name = 'test'  # group name to leave
    token = 'gCLN89XTX7d6JrB0XyMp'  # user to add
