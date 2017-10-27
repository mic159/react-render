from django.conf.urls import url
from .views import index, comment

urlpatterns = [
    url(r'^$', index, name='index'),
    url(r'^comment/$', comment, name='comment'),
]
