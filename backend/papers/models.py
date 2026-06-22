from django.db import models
from authentication.models import User


class Paper(models.Model):
    BRANCH_CHOICES = (
        ('CSE', 'CSE'),
        ('ECE', 'ECE'),
        ('ME', 'ME'),
        ('CE', 'CE'),
        ('EE', 'EE'),
    )

    title = models.CharField(max_length=200)
    subject = models.CharField(max_length=100)
    year = models.IntegerField()

    semester = models.CharField(max_length=2)
    branch = models.CharField(max_length=10, choices=BRANCH_CHOICES)

    pdf = models.FileField(upload_to='papers/')

    uploaded_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    approved = models.BooleanField(default=False)

    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title