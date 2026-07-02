from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, login_id, email, name, password=None, **extra_fields):
        if not login_id:
            raise ValueError("Login ID is required")

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            login_id=login_id,
            email=email,
            name=name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, login_id, email, name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        return self.create_user(
            login_id,
            email,
            name,
            password,
            **extra_fields
        )


class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = (
        ("student", "Student"),
        ("admin", "Admin"),
    )

    login_id = models.CharField(max_length=30, unique=True)

    email = models.EmailField(unique=True)

    name = models.CharField(max_length=100)

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="student"
    )

    branch = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    semester = models.PositiveIntegerField(
        blank=True,
        null=True
    )

    points = models.IntegerField(default=0)

    is_active = models.BooleanField(default=True)

    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "login_id"

    REQUIRED_FIELDS = ["email", "name"]

    def __str__(self):
        return self.login_id