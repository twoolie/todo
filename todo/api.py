from rest_framework.serializers import ModelSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.routers import DefaultRouter

from .models import ToDo

router = DefaultRouter()

class ToDoSerializer(ModelSerializer):
    class Meta:
        model = ToDo

class ToDoViewSet(ModelViewSet):
    queryset = ToDo.objects.all().order_by('created')
    serializer_class = ToDoSerializer

router.register('todo', ToDoViewSet)