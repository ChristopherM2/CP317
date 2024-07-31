
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
    path('newGroup/', views.new_group, name="newGroup"),
    path('addUserToGroup/', views.add_user_to_group, name="addUserToGroup"),
    path('removeUserFromGroup/', views.remove_user_from_group, name="removeUserFromGroup"),
    path('getGroup/', views.get_group, name="getGroup"),
    path('sendmessage/', views.sendMessage, name="sendMessage"),
    path('addTask/', views.addTask, name="addTask"),
    path('getTasks/', views.getTasks, name="getTasks"),
    path('getMessages/', views.getMessages, name="getMessages"),

    path('completeTask/', views.completetask, name="completeTask"),

    path('getCompletedTasks/', views.getCompletedTasks, name="getCompletedTasks"),

    path('getGroupMembers/', views.getGroupMembers, name="getGroupMembers"),

    path('updateMemberCompletion/', views.updateMemberCompletion, name="updateMemberCompletion"),




]
