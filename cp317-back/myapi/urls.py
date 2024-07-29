
from django.urls import path
from . import views
"""
-------------------------------------------------------
List of URL patterns to be used in the project
-------------------------------------------------------
"""
urlpatterns = [
    path('hello-world/', views.hello_world, name="hello-world"),
    path('login/', views.login, name="login"),
    path('friends/', views.friends, name="friends"),
    path('signup/', views.signup, name="signup"),
    path('time/', views.current_time, name="timywimey"),
    path('getuser/', views.get_user, name="get_user"),
    path('newGroup/', views.newGroup, name="newGroup"),
    path('addUserToGroup/', views.addUserToGroup, name="addUserToGroup"),
    path('removeUserFromGroup/', views.removeUserFromGroup, name="removeUserFromGroup"),
    path('getGroup/', views.getGroup, name="getGroup"),
    path('sendmessage/', views.sendMessage, name="sendMessage"),
    path('addTask/', views.addTask, name="addTask"),
    path('getTasks/', views.getTasks, name="getTasks"),
    path('getMessages/', views.getMessages, name="getMessages"),

    path('completeTask/', views.completeTask, name="completeTask"),

    path('getCompletedTasks/', views.getCompletedTasks, name="getCompletedTasks"),

    path('getGroupMembers/', views.getGroupMembers, name="getGroupMembers"),

    path('updateMememberCompletion/', views.updateMememberCompletion, name="updateMememberCompletion"),




]
