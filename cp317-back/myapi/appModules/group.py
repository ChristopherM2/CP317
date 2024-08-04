import datetime
from typing import Any

from rest_framework.response import Response
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import datetime


class group:
    def __init__(self, instance: Any):
        pass

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

    "given a user token check if the user exists in the database"

    "Given a group name and a user token, create a new group with the user as the admin and only member"

    def newGroup(self, request, app):  # verified to work
        db = firestore.client(app)
        try:
            name = request.data['name']
            token = request.data['token']
            print(name)
            user = db.collection('accountInfo').document(token).get().to_dict()
            if user.get('group') is not None:
                return Response({'message': "User is already in a group"}, status=403)
            elif db.collection('groups').document(name).get().exists:
                return Response({'message': "Group already exists"}, status=400)

            else:
                print(name)
                group = db.collection('groups').document(name).set(
                    {'members': [token], 'admin': token, 'messages': [], 'tasks': []})

                user = db.collection('accountInfo').document(token)
                user.set({'group': name}, merge=True)
                return Response({'message': "Created :3"}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    "get all the available groups in the database"

    def getAvailableGroups(self, request, app):  # verified to work
        db = firestore.client(app)
        groups = db.collection('groups').stream()
        group_list = []
        for group in groups:
            meow = group
            group_list.append(meow.id)
        print(group_list)
        return Response({'message': group_list}, status=200)

    "Given a group name and a user token, add the user to the group"

    def addUserToGroup(self, request, app):  # Verified to work
        db = firestore.client(app)
        name = request.data['name']  # group name to join
        token = request.data['token']  # user to add
        user = db.collection('accountInfo').document(token).get()
        if user is not None:
            user = user.to_dict()
        if user is None:
            return Response({'message': "User does not exist or you are not authenticated"}, status=498)
        elif user.get('group') is not None:
            return Response({'message': "User is already in a group"}, status=403)

        group_ref = db.collection('group').document(name)
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

                    return Response({'message': "User added to group", 'name': name}, status=200)
                else:
                    return Response({'message': "Error", 'name': name}, status=400)
            else:
                print(f"Group does not exist")
                return Response({'message': "Error", 'name': name}, status=401)
        except Exception as e:
            print(f"Error updating group: {e} :((((")

    "Given a user token, remove the user from the group"

    def removeUserFromGroup(self, request, app):  # 97% sure it works
        db = firestore.client(app)
        token = request.data['token']  # user to add
        if db.collection('accountInfo').document(token).get() is None:
            return Response({'message': "User does not exist or you are not authenticated"}, status=498)
        name = db.collection('accountInfo').document(token).get().to_dict().get('group')
        if name is None:
            return Response({'message': "User is not in a group"}, status=403)

        else:
            group = db.collection('group').where('name', '==', name).get()[0].id
            group_ref = db.collection('group').document(group)
            user_ref = db.collection('accountInfo').document(token)

            try:
                group_doc = group_ref.get()
                if group_doc.exists:
                    group_data = group_doc.to_dict()
                    currentMembers = group_data.get('members', [])
                    if group_data.get('admin') == token:
                        return Response({'message': 'Admin cannot leave the group'}, status=403)
                    # Remove the user token from the members list if it exists
                    if token in currentMembers:
                        currentMembers.remove(token)

                        # Update the user's groups to None or remove the group name
                        user_ref.set({'group': None}, merge=True)

                        # Update the group's members
                        group_ref.set({'members': currentMembers}, merge=True)

                        return Response({'message': 'User removed from the group successfully'}, status=200)
                    else:
                        return Response({'message': 'User not in the group'}, status=403)
                else:
                    return Response({'message': 'Group does not exist'}, status=418)
            except Exception as e:
                return Response({'message': 'Error updating group: {e}'}, status=500)

    "Given a group name and a user token, complete a task in the group tasks list"

    def completeTask(self, request, app):
        try:
            db = firestore.client(app)

            token = request.data['token']
            group = db.collection('accountInfo').document(token).get().to_dict().get('group')
            task = request.data['task']

            if db.collection('accountInfo').document(token).get() is None:
                return Response({'message': "User does not exist or you are not authenticated"}, status=498)

            group_doc = db.collection('groups').where('name', '==', group).get()[0]
            if group_doc.exists:
                tasks_list = group_doc.to_dict().get('tasks', [])
                if tasks_list is None:
                    tasks_list = []
            else:
                tasks_list = []

            # Find the task in the tasks list
            for t in tasks_list:
                if t.get('task') == task:
                    t['completed'] = True
                    break

            group.set({'tasks': tasks_list}, merge=True)
            return Response({'message': "Task completed successfully"}, status=200)
        except Exception as e:
            return Response({'message': str(e)}, status=500)

    "Given a user token send a message to the user's group"

    def sendMessage(self, request, app):  # this should work :100:
        db = firestore.client(app)
        user = db.collection('AccountInfo').document(request.data['token']).get().to_dict()
        group = db.collection('groups').document(user.get('group'))

        # Get the current messages
        group_doc = group.get()
        if group_doc.exists:
            messages = group_doc.to_dict().get('messages', [])
        else:
            return Response({'message': "Group doesn't exist :( "}, status=401)

        # Append the new message to the messages list

        new_message = {
            'message': request.data['message'],
            'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),  # Current time in string format
            'sender': user.get('publicToken'),

        }
        messages.append(new_message)

        # Update the messages field in the group document
        group.set({'messages': messages}, merge=True)

    "Given a group name and a user token, add a task to the group tasks list"

    def addTask(self, request, app):  # works now frfr
        db = firestore.client(app)

        token = request.data['token']
        if db.collection('accountInfo').document(token).get() is None:
            return Response({'message': "User does not exist or you are not authenticated"}, status=498)
        taskz = request.data['task']
        name = db.collection('accountInfo').document(token).get().to_dict().get('group')
        group = db.collection('groups').document(name)
        group_doc = group.get()

        if group_doc.exists:
            tasks_list = group_doc.to_dict().get('tasks', [])
            if tasks_list is None:
                tasks_list = []
        else:
            tasks_list = []

        # Create a new task
        new_task = {
            'task': taskz,
            'completed': False,
            'time': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),  # Current time in string format
            'User': token
        }
        tasks_list.append(new_task)  #make sure not to overrite the tasks list

        group.set({'tasks': tasks_list}, merge=True)
        return Response({'message': "Task added successfully"}, status=200)

    "Given a group name, return the current tasks"

    def getTasks(self, request, app):
        db = firestore.client(app)
        name = request.data['name']
        if db.collection('groups').document(name).get().exists:
            group = db.collection('groups').document(name)
            return Response({'message': group.get('tasks')}, status=200)
        else:
            return Response({'message': "Group does not exist"}, status=418)

    "Given a group name, return the group members"

    def getGroupMembers(self, request, app):
        db = firestore.client(app)
        name = request.data['name']
        if db.collection('groups').document(name).get().exists:
            group = db.collection('groups').document(name)
            return Response({'message': group.get('members')}, status=200)
        else:
            return Response({'message': "Group does not exist"}, status=418)

    "Given a group name, update the member completion count and the group completed tasks count"

    def updateMemberCompletion(self, request, app):
        db = firestore.client(app)
        name = request.data['name']
        token = request.data['token']
        if db.collection('groups').document(name).get().exists:
            curr = db.collection('accountInfo').document(token).get().to_dict().get('count')
            db.collection('accountInfo').document(token).set({'count': curr + 1}, merge=True)
            group = db.collection('groups').document(name)
            completedTasks = group.get().to_dict().get('completedTasks')
            completedTasks += 1
            group.set({'completedTasks': completedTasks}, merge=True)

            return Response({f'message': "completed tasks updated. count: " + completedTasks}, status=200)
        else:
            return Response({'message': "Group does not exist"}, status=418)

    " Given a group name, return the messages"

    def getMessages(self, request, app):
        db = firestore.client(app)
        name = request.data['name']
        if db.collection('groups').document(name).get().exists:
            group = db.collection('groups').document(name)
            return Response({'message': group.get('messages')}, status=200)
        else:
            return Response({'message': "Group does not exist"}, status=418)

    """
    Given a group name, return the completed tasks
    """

    def getCompletedTasks(self, request, app):
        db = firestore.client(app)
        name = request.data['name']
        if db.collection('groups').document(name).get().exists:
            group = db.collection('groups').document(name)
            return Response({'message': group.get('completedTasks')}, status=200)
        else:
            return Response({'message': "Group does not exist"}, status=418)

    if __name__ == '__main__':  # edit this method to test the functions
        # copy and paste the code from the function you want to test
        # replace name and token etc with test data since we cant replicate http requests or atleast not easily yk
        cred = credentials.Certificate("serviceAccountKey.json")
        app = firebase_admin.initialize_app(cred)
        db = firestore.client(app)
        name = 'test'  # group name to leave
        token = 'gCLN89XTX7d6JrB0XyMp'  # user to add
