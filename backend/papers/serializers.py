from rest_framework import serializers
from .models import Paper


class PaperSerializer(serializers.ModelSerializer):

    uploaded_by = serializers.ReadOnlyField(source="uploaded_by.login_id")

    class Meta:
        model = Paper
        fields = "__all__"