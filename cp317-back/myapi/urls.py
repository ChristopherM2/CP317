
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
    path('newGroup/', views.newgroup, name="newGroup"),
    path('addUserToGroup/', views.addusertogroup, name="addUserToGroup"),
    path('removeUserFromGroup/', views.removeuserfromGroup, name="removeUserFromGroup"),
    path('getGroup/', views.getgroup, name="getGroup"),
    path('sendmessage/', views.sendmessage, name="sendMessage"),
    path('addTask/', views.addtask, name="addTask"),
    path('getTasks/', views.gettasks, name="getTasks"),
    path('getMessages/', views.getmessages, name="getMessages"),

    path('completeTask/', views.completetask, name="completeTask"),

    path('getCompletedTasks/', views.getcompletedtasks, name="getCompletedTasks"),

    path('getGroupMembers/', views.getgroupmembers, name="getGroupMembers"),

    path('updateMemberCompletion/', views.updatemembercompletion, name="updateMemberCompletion"),




]
