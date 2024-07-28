
from django.urls import path
from . import views

urlpatterns = [
    path('hello-world/', views.hello_world, name="hello-world"),
    path('login/', views.login, name="login"),
    path('friends/', views.friends, name="friends"),
    path('group/', views.group, name="group"),
    path('signup/', views.signup, name="signup")

]
