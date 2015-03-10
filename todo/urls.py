# from django.contrib import admin
from django.views.generic import TemplateView
from django.conf.urls import patterns, include, url

from . import api

urlpatterns = patterns('',
    # url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include(api.router.urls)),
    url(r'^$', TemplateView.as_view(template_name='todo.html'))
)
