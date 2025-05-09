from rest_framework import serializers
from .models import User, Student, Province, District, Villege
from django.contrib.auth.models import Group, Permission
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.core.exceptions import ValidationError
# from django.contrib.auth.tokens import PasswordResetTokenGenerator
# from django.utils.http import urlsafe_base64_decode
# from rest_framework.serializers import ValidationError
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from django.contrib.auth import authenticate
# from rest_framework.authentication import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
# from rest_framework.exceptions import AuthenticationFailed
# from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
# from rest_framework.response import Response

from django.core.mail import EmailMultiAlternatives
# from django.utils.encoding import force_bytes, force_str
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.contrib.auth.tokens import default_token_generator

from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import logout


from django.conf import settings
from django.contrib.auth.tokens import default_token_generator
from django.urls import reverse
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from common.mixins import SoftDeleteMixin
# from .permission import (
#     GroupPermission,
#     PermissionPermission,
#     UserPermission
# )
from django.contrib.auth import logout as django_logout
# from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
import logging
from django.contrib.auth import authenticate, login


from django.utils.translation import gettext_lazy as _
from rest_framework import serializers
from .models import Province, District, Villege



class ProvinceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Province
        fields = ['id',
                  'name',
                  'created_at',
                  'updated_at',
                  'is_deleted',
                  'deleted_at'
                  ]
        read_only_fields = ['created_at', 'updated_at', 'is_deleted', 'deleted_at']



class DistrictSerializer(serializers.ModelSerializer):
    province_id = ProvinceSerializer(read_only=True)
    province = serializers.PrimaryKeyRelatedField(
        queryset=Province.objects.all(), write_only=True, source='province_id'
    )

    class Meta:
        model = District
        fields = ['id',
                  'name',
                  'province_id',
                  'province',
                  'created_at',
                  'updated_at',
                  'is_deleted',
                  'deleted_at'
                  ]
        read_only_fields = ['created_at', 'updated_at', 'is_deleted', 'deleted_at']



class VillegeSerializer(serializers.ModelSerializer):
    district_id = DistrictSerializer(read_only=True)
    district = serializers.PrimaryKeyRelatedField(
        queryset=District.objects.all(), write_only=True, source='district_id'
    )

    class Meta:
        model = Villege
        fields = ['id',
                  'name',
                  'district_id',
                  'district',
                  'created_at',
                  'updated_at',
                  'is_deleted',
                  'deleted_at'
                  ]
        read_only_fields = ['created_at', 'updated_at', 'is_deleted', 'deleted_at']



class StudentSerializer(serializers.ModelSerializer):
    villege_id = VillegeSerializer(read_only=True)
    villege = serializers.PrimaryKeyRelatedField(
        queryset=Villege.objects.all(), write_only=True, source='villege_id'
    )
    class Meta:
        model = Student
        fields = [
            'id',
            'first_name',
            'last_name',
            'phone',
            'department',
            'brith_day',
            'code_student',
            'villege_id',
            'villege',
            'created_at',
            'updated_at',
            'is_deleted',
            'deleted_at'
            ]
        read_only_fields = ['created_at', 'updated_at', 'is_deleted', 'deleted_at']



class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    
    # รับ student data
    student_data = StudentSerializer(required=False)

    class Meta:
        model = User
        fields = ["email","username" ,"avatar","password", "password2", "student_data", ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password2")

        # สร้าง student ถ้ามี
        student_data = validated_data.pop("student_data", None)
        student_instance = None

        if student_data:
            # ตรวจสอบว่า 'villege' ที่ส่งมามีอยู่ในระบบหรือไม่
            villege_id = student_data.get("villege_id")
            villege_instance = None
            if villege_id:
                try:
                    villege_instance = Villege.objects.get(id=villege_id)
                except Villege.DoesNotExist:
                    raise serializers.ValidationError({"villege": "Invalid villege id."})

            # สร้าง Student
            student_instance = Student.objects.create(
                first_name=student_data["first_name"],
                last_name=student_data["last_name"],
                phone=student_data["phone"],
                department=student_data["department"],
                brith_day=student_data["brith_day"],
                code_student=student_data["code_student"],
                villege_id=villege_instance
            )

        user = User.objects.create(
            email=validated_data["email"],
            username = validated_data["username"],
            avatar = validated_data["avatar"],
            student_id=student_instance
        )
        user.set_password(password)
        user.save()
        return user



class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = "__all__"



class GroupSerializer(serializers.ModelSerializer):
    permissions = PermissionSerializer(many=True, read_only=True)
    permissions_id = serializers.PrimaryKeyRelatedField(
        queryset=Permission.objects.all(), write_only=True, source='permissions'
    )

    class Meta:
        model = Group
        fields = ['id', 'name', 'permissions', 'permissions_id']



class UserSerializer(serializers.ModelSerializer):
    student_id = StudentSerializer(read_only=True)
    student = serializers.PrimaryKeyRelatedField(
        queryset=Student.objects.all(), write_only=True, source='student_id'
    )
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'password',
            'avatar',
            'is_staff',
            'is_active',
            'is_superuser',
            'is_verify',
            'student_id',
            'student',
            'last_login',
            # 'date_joined',
            'groups',
            'user_permissions',
            'created_at',
            'updated_at',
            'is_deleted',
            'deleted_at',
            
        ]
        read_only_fields = ['id', 'last_login', 'created_at', 'updated_at', 'is_deleted', 'deleted_at']
        extra_kwargs = {
            "last_login": {"required": False},
            "date_joined": {"required": False},
            "created_at": {"required": False},
            "updated_at": {"required": False},
            "password": {"write_only": True},
        }

    def validate_password(self, value):

        validate_password(value)
        return value

    def create(self, validated_data):

        validated_data["password"] = make_password(validated_data["password"])
        
        validated_data['is_verify'] = False
        validated_data["is_active"] = True
        
        return super().create(validated_data)

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)

        if password:
            validate_password(password, user=instance)
            instance.set_password(password)
            print("password update:", password)

        return super().update(instance, validated_data)
        # user = self.context['request'].user
        
        # if (
        #     not user.is_superuser
        #     and not user.groups.filter(permissions__codename="some_permission").exists()
        # ):
        #     validated_data.pop("is_staff", None)
        #     validated_data.pop("is_superuser", None)
        #     validated_data.pop("groups", None)
        #     validated_data.pop("user_permissions", None)
        #     validated_data.pop("password", None)
    def get_fields(self):
        fields = super().get_fields()
        request = self.context.get("request")
        if self.instance:
            fields.pop("password")
            
        if request.method in ["POST", "PUT", "PATCH"]:
            user = request.user
            if (
                not user.is_superuser
                and not user.groups.filter(permissions__codename=" ").exists()
                ):
                fields.pop("is_staff")
                fields.pop("is_superuser")
                fields.pop("groups")
                fields.pop("user_permissions")
        return fields



class UserTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["user_id"] = user.id
        token["email"] = user.email
        token["username"] = user.username
        token["group"] = user.groups.values_list('name', flat=True).first()

        return token

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        
        email = email.lower()
        # ตรวจสอบว่า email มีอยู่ในระบบหรือไม่
        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError('User with this email does not exist.')
        try:
            user = self.user = authenticate(
                request=self.context.get('request'),
                username=email,
                password=password
            )
        except:
            user = None

        if user is None:
            raise serializers.ValidationError(_('Incorrect password.'))

        if not user.is_verify:
            raise AuthenticationFailed('User account is not verified.')
        data = super().validate(attrs)
        data.update({
            'user_id': user.id,
            'email': user.email,
            'username': user.username,
            'group': user.groups.values_list('name', flat=True).first(),
        })
        return data



class UserlogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()
    class Meta:
        fields = ['refresh']
    
    
    
class ChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required= True, write_only = True)
    new_password = serializers.CharField(required= True, write_only = True, validators=[validate_password])
    new_password2 = serializers.CharField(required= True, write_only = True)
    def validate(self, attrs):
        user = self.context['request'].user
        if not user.check_password(attrs['password']):
            raise serializers.ValidationError({"password": "Current password is incorrect."})
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({"new_password2": "New password fields didn't match."})
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance



class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        user = User.objects.filter(email=value).first()
        if user is None:
            raise serializers.ValidationError('User with this email does not exist')
        return value

    def save(self, **kwargs):
        user = User.objects.get(email=self.validated_data['email'])
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_link = f'http://your-frontend-url/confirm-reset-password/{uid}/{token}/'

        # Render email content
        subject = 'Password Reset'
        from_email = 'webmaster@example.com'
        to_email = user.email
        context = {
            'user': user,
            'reset_link': reset_link,
        }
        text_content = render_to_string('email/password_reset_email.txt', context)
        html_content = render_to_string('email/password_reset_email.html', context)

        # Send email
        email = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
        email.attach_alternative(html_content, 'text/html')
        email.send()



class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField()

    def validate(self, attrs):
        try:
            uid = force_str(urlsafe_base64_decode(attrs['uid']))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            raise serializers.ValidationError("Invalid token")

        if not default_token_generator.check_token(user, attrs['token']):
            raise serializers.ValidationError("Invalid token or token expired")

        return attrs

    def save(self, **kwargs):
        uid = self.validated_data['uid']
        user = User.objects.get(pk=force_str(urlsafe_base64_decode(uid)))
        user.set_password(self.validated_data['new_password'])
        user.save()
        return user



class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    class Meta:
        fields = "email"
    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email address is not associated with any account.")
        return value
