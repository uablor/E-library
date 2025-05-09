from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from common.models.base_models import Base_model
from common.models.soft_delete_models import SoftDeleteManager
from .utils import (
    profile_image_storage,
)
from common.validator.validators import validate_image_extension, validate_max_file_size




# Custom User Manager
class UserManager(SoftDeleteManager, BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_fields):
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_active", True)
        return self.create_user(email, username, password, **extra_fields)

# Custom User Model
class User(AbstractBaseUser, PermissionsMixin, Base_model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    username = models.CharField(max_length=150, unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_verify = models.BooleanField(default=False)
    avatar = models.FileField(
        upload_to=profile_image_storage,
        validators=[validate_image_extension, validate_max_file_size],
        blank=True,
        null=True,
    )

    # Foreign Key to Student
    student_id = models.ForeignKey('Student', on_delete=models.SET_NULL, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']

    objects = UserManager()

    def __str__(self):
        return self.email

class Province(Base_model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Villege(Base_model):
    name = models.CharField(max_length=255)
    district_id = models.ForeignKey('District', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
class District(Base_model):
    name = models.CharField(max_length=255)
    province_id = models.ForeignKey('Province', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Student(Base_model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.CharField(max_length=20)
    department = models.CharField(max_length=100)
    brith_day = models.DateField()
    code_student = models.CharField(max_length=100)

    villege_id = models.ForeignKey(Villege, on_delete=models.CASCADE, null=True,
    blank=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# class Group(Group, Base_model):
#     pass

# class Permission(Permission, Base_model):
#     pass