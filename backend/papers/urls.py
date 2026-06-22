from django.urls import path
from .views import upload_paper, get_papers

urlpatterns = [
    path('upload/', upload_paper),
    path('', get_papers),
]