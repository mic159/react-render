from django.conf.urls import include, url

urlpatterns = [
    url(r'^', include('example_app.urls')),
]