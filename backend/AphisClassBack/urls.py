from django.urls import re_path

from AphisClass import settings
from AphisClassBack import views
from django.conf.urls import include
from django.conf.urls.static import static


urlpatterns = [
    re_path(r'^api/aphids$', views.aphids_list),
    re_path(r'^api/aphids/(?P<pk>[0-9]+)$', views.aphid_detail),
    re_path(r'^api/aphids/classify$', views.classify_aphid),
    re_path(r'^api/aphids/image$', views.post_image),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
