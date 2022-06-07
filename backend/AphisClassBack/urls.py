from django.urls import re_path
from AphisClassBack import views

urlpatterns = [
    re_path(r'^api/aphids$', views.aphids_list),
    re_path(r'^api/aphids/(?P<pk>[0-9]+)$', views.aphis_detail),
]
