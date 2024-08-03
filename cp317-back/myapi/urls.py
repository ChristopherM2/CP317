from django.urls import path
from . import views

"""
-------------------------------------------------------
List of URL patterns to be used in the project
-------------------------------------------------------
"""
urlpatterns = [
    path('hello-world/', views.hello_world, name="hello-world"), #useless api
    path('login/', views.login, name="login"),  # param email and password returns token
    path('friends/', views.friends, name="friends"),
    path('signup/', views.signup, name="signup"),  # param email and pawword returns token
    path('time/', views.current_time, name="timywimey"),  # idfk
    path('getuser/', views.get_user, name="get_user"),  # parak token returns user info
    path('getPublicUser/', views.get_public_user, name="getPublicUser"),  # param email returns user info(just a lil)
    path('newGroup/', views.new_group, name="newGroup"),  # param token and group name(pass as "name") returns group id
    path('addUserToGroup/', views.add_user_to_group, name="addUserToGroup"), # param token, group name(pass as name),
    path('removeUserFromGroup/', views.remove_user_from_group, name="removeUserFromGroup"), # param token, group name(pass as name),
    path('getGroup/', views.get_group, name="getGroup"), #param name returns group info
    path('sendmessage/', views.sendMessage, name="sendMessage"), #param name, message, token
    path('addTask/', views.addTask, name="addTask"), #param name, task, token
    path('getTasks/', views.getTasks, name="getTasks"), #param name, returns tasks
    path('getMessages/', views.getMessages, name="getMessages"), #param name, returns messages

    path('completeTask/', views.completetask, name="completeTask"), #param name, task, token

    path('getCompletedTasks/', views.getCompletedTasks, name="getCompletedTasks"), #param name, returns completed tasks

    path('getGroupMembers/', views.getGroupMembers, name="getGroupMembers"), #param name, returns members

    path('updateGroupCompletion/', views.updateMemberCompletion, name="updateMemberCompletion"), #param name, increases task by one

    path('updateImage/', views.updateImage, name="updateImage"), #param token, image (as a url)
    path('updateUsername/', views.updateUsername, name="updateUsername"), #param token, username
    path('updateEmail/', views.updateEmail, name="updateEmail"), #param token, email
    path('updateDarkmode/', views.updateDarkmode, name="updateDarkmode"), #param token, darkmode
    path('updateTracking/', views.updateTracking, name="updateTracking"), #param token, tracking
    path('updatePassword/', views.updatePassword, name="updatePassword"), #param token, password

]
