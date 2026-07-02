from django.db import models
from django.conf import settings


class Paper(models.Model):

    EXAM_CHOICES = (
        ("mid", "Mid Semester"),
        ("end", "End Semester"),
    )

    title = models.CharField(max_length=200)

    subject = models.CharField(max_length=100)

    branch = models.CharField(max_length=20)

    semester = models.PositiveIntegerField()

    year = models.PositiveIntegerField()

    exam_type = models.CharField(
        max_length=10,
        choices=EXAM_CHOICES
    )

    description = models.TextField(blank=True)

    pdf = models.FileField(upload_to="papers/")

    uploaded_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    downloads = models.PositiveIntegerField(default=0)

    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} ({self.year})"