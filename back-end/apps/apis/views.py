from rest_framework.views import APIView
from rest_framework.reverse import reverse
from rest_framework.response import Response


class ListApiAPIview(APIView):
    def get(self, request, *args, **kwargs):
        data = {
            "auth" : {
                    
                "login-logout-register" : {
                    
                "login": reverse("api:user_login", request=request),
                "token_obtain_pair": reverse("api:token_obtain_pair", request=request),
                "logout": reverse("api:user_logout", request=request),
                # "token refresh": reverse("api:token-refresh", request=request),
                "register": reverse("api:user-register", request=request, format=None),
                    },
                "profile" : {
                    
                    "authMe": reverse("api:auth_me", request=request, format=None)
                    
                    },
                "custom password" :  {
                    
                "confirm reset password": reverse("api:confirm_reset_password", request=request),
                "change password": reverse("api:change_password", request=request),
                "send reset password": reverse("api:send_reset_password", request=request, format=None),
                    },
                
                "verify email" : {
                    
                "resend verify email": reverse("api:resend_verify_email", request=request, format=None),
                "verify email": reverse("api:verify_email", request=request, format=None),
                    },
            },
            "account" : {
                
                "user": reverse("api:user-list", request=request, format=None),
                "student": reverse("api:student-list", request=request, format=None),
                "group": reverse("api:group-list", request=request, format=None),
                "permission": reverse("api:permission-list", request=request, format=None)
            },
            "address" : {
                "provinces": reverse("api:province-list", request=request, format=None),
                "districts": reverse("api:district-list", request=request, format=None),
                "villages": reverse("api:village-list", request=request, format=None),
            },
            "book":{
                "book": reverse("api:books-list", request=request, format=None),
                "book type": reverse("api:book_types-list", request=request, format=None),
                "book file": reverse("api:book_files-list", request=request, format=None),
                "book score": reverse("api:book_scores-list", request=request, format=None),
                "book cetagories": reverse("api:cetagories-list", request=request, format=None),
                "book history": reverse("api:book_historys-list", request=request, format=None),
            },
        }
        return Response(data)
