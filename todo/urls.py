# from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include

from . import api

urlpatterns = [
    # url(r'^admin/', include(admin.site.urls)),
    path(r'api/', include(api.router.urls)),
    path(r'', TemplateView.as_view(template_name='todo.html')),
]
