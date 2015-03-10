from django.db.models import *

class ToDo(Model):

    text = TextField(blank=False)
    done = BooleanField(blank=True, default=False)

    created = DateTimeField(auto_now_add=True)