from rest_framework.decorators import api_view
from rest_framework.response import Response
from appModules.login import loginreqs
# Create your views here.
@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'if this works i wont end it all!!'})


@api_view(['GET'])
def login(request):
    return loginreqs(request)


@api_view(['GET'])
def friends(request):
    return Response({'message': "test"})
@api_view(['GET'])
def group(request):
    return Response({'message': 'meow'})