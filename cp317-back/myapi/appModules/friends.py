from rest_framework.response import Response

def friends(request):
    return Response({'message': "test"})