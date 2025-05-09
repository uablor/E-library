from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, GenericAPIView, UpdateAPIView
from .models import User, Student, Province, District, Villege
from django.contrib.auth.models import Group, Permission
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import (
    PermissionSerializer,
    UserSerializer, 
    UserRegisterSerializer, 
    GroupSerializer,
    StudentSerializer,
    ProvinceSerializer, 
    DistrictSerializer, 
    VillegeSerializer,
    UserTokenObtainPairSerializer, 
    UserlogoutSerializer, 
    ChangePasswordSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetSerializer,
    EmailSerializer
)

from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken
from common.mixins.SoftDeleteMixin import SoftDeleteMixin
# from .permission import (
#     GroupPermission,
#     PermissionPermission,
#     UserPermission
# )

from django.contrib.auth import logout as django_logout
from django.contrib.auth import login
import logging

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

logger = logging.getLogger(__name__)



class ProvinceViewSet(ModelViewSet):
    queryset = Province.objects.all()
    serializer_class = ProvinceSerializer


class DistrictViewSet(ModelViewSet):
    queryset = District.objects.all()
    serializer_class = DistrictSerializer


class VillegeViewSet(ModelViewSet):
    queryset = Villege.objects.all()
    serializer_class = VillegeSerializer


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class UserRegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer
    permission_classes = [AllowAny]
    
    
class UserViewSet(SoftDeleteMixin, ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
    
class GroupViewSet(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [AllowAny]


class PermissionViewSet(ModelViewSet):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer
    permission_classes = [AllowAny]
    
    
class UserLoginView(APIView):
    serializer_class = UserTokenObtainPairSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user 
        token_data = serializer.validated_data

        login(request, user)
        return Response(token_data, status=status.HTTP_200_OK)
    
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = UserTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        return response
    
    
class UserLogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = UserlogoutSerializer
    def post(self, request):
        django_logout(request)

        try:
            refresh_token = self.serializer_class(data=request.data)
            if refresh_token:
                token = RefreshToken(refresh_token)
                token.blacklist()
        except Exception:
            pass
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
class UserAuthMeView(RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
    

class ChangePasswordView(UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        return self.request.user

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Change password
            self.object.set_password(serializer.validated_data['new_password'])
            self.object.save()
            return Response({'status': 'password set'}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
    
class PasswordResetView(GenericAPIView):
    serializer_class = PasswordResetSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': 'password reset email sent'}, status=status.HTTP_200_OK)



class PasswordResetConfirmView(GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({'status': 'password reset successful'}, status=status.HTTP_200_OK)



class VerifyEmailAPIView(APIView):
    
    permission_classes = [ AllowAny]
    def get(self, request, *args, **kwargs):
        uid = request.query_params.get('uid')
        token = request.query_params.get('token')
        if uid is None or token is None:
            return Response({'error': 'Missing uid or token'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            uid = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_verify = True
            user.save()
            return Response({'detail': 'Email successfully verified'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid verification link'}, status=status.HTTP_400_BAD_REQUEST)
        


class ResendVerificationEmailAPIView(APIView):
    serializer_class = EmailSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)

            if user.is_verify == True:
                return Response({'message': 'Email is already verified.'}, status=status.HTTP_400_BAD_REQUEST)
            try:
                subject = 'Verify Your Email Address'
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                token = default_token_generator.make_token(user)
                verify_url = f"http://localhost:8000{reverse('api:verify_email')}?uid={uid}&token={token}"

                context = {
                    'user': user,
                    'verify_url': verify_url,
                }
                convert_to_html_content =  render_to_string(
                template_name="email/verification_email.html",
                context = context
                )
                
                plain_message = strip_tags(convert_to_html_content)
                a = send_mail(
                subject=subject,
                message=plain_message,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[user.email],   # recipient_list is self explainatory
                html_message=convert_to_html_content,
                fail_silently=True,   # Optional
                ) 
                return Response({'message': 'Verification email resent successfully.'}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f'Error sending email: {e}')
                print(f'Error sending email: {e}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

