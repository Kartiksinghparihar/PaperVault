from django.urls import path
from .views import PaperListCreateView, PaperDetailView

urlpatterns = [
    path("", PaperListCreateView.as_view(), name="paper-list"),
    path("<int:pk>/", PaperDetailView.as_view(), name="paper-detail"),
]