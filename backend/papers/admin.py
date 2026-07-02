from django.contrib import admin
from .models import Paper


@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "subject",
        "branch",
        "semester",
        "year",
        "exam_type",
        "downloads",
    )

    search_fields = (
        "title",
        "subject",
        "branch",
    )

    list_filter = (
        "branch",
        "semester",
        "year",
        "exam_type",
    )