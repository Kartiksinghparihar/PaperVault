from django.contrib import admin
from .models import Paper


@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = (
        'title',
        'subject',
        'branch',
        'semester',
        'year',
        'approved'
    )

    list_filter = (
        'branch',
        'semester',
        'approved'
    )