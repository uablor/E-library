
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.accounts.views import (
    UserViewSet,
    UserRegisterView, 
    StudentViewSet, 
    ProvinceViewSet,
    DistrictViewSet, 
    VillegeViewSet,
    GroupViewSet,
    PermissionViewSet,
    CustomTokenObtainPairView,
    UserLoginView,
    UserLogoutView,
    UserAuthMeView,
    PasswordResetConfirmView,
    ChangePasswordView,
    PasswordResetView,
    VerifyEmailAPIView,
    ResendVerificationEmailAPIView   
)

from apps.books.views import (
    BookViewSet,
    CetagoriesViewSet,
    BooktypeViewSet,
    BookFilesViewSet,
    BookScoreViewSet,
    BookHistoryViewSet,)

from .views import ListApiAPIview

app_name = 'api'


# Create a custom router by inheriting from DefaultRouter
# class CustomRouter(DefaultRouter):
#     def get_api_root_view(self, api_urls=None):
#         root_view = super().get_api_root_view(api_urls)
#         root_view.cls.__doc__ = "Your custom API root description here."
#         return root_view


router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'students', StudentViewSet, basename='student')
router.register(r'provinces', ProvinceViewSet, basename='province')
router.register(r'districts', DistrictViewSet, basename='district')
router.register(r'villages', VillegeViewSet, basename='village')
router.register(r'groups', GroupViewSet, basename='group')
router.register(r'permissions', PermissionViewSet, basename='permission')
router.register(r'book', BookViewSet, basename='books')
router.register(r'Cetagorie', CetagoriesViewSet, basename='cetagories')
router.register(r'book_type', BooktypeViewSet, basename='book_types')
router.register(r'book_file', BookFilesViewSet, basename='book_files')
router.register(r'book_score', BookScoreViewSet, basename='book_scores')
router.register(r'book_History', BookHistoryViewSet, basename='book_historys')

urlpatterns = [
    path("", ListApiAPIview.as_view(), name="list_api_view"),
    path('register/', UserRegisterView.as_view(), name='user-register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/', UserLoginView.as_view(), name='user_login'),
    path('logout/', UserLogoutView.as_view(), name='user_logout'),
    path('authMe/', UserAuthMeView.as_view(), name='auth_me'),
    path('send-reset-password/', PasswordResetView.as_view(), name='send_reset_password'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('confirm-reset-password/', PasswordResetConfirmView.as_view(), name='confirm_reset_password'),
    path('verify-email/', VerifyEmailAPIView.as_view(), name='verify_email'),
    path('resend-verify-email/', ResendVerificationEmailAPIView.as_view(), name='resend_verify_email'),
]

urlpatterns += router.urls