from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, email=None, **kwargs):
        UserModel = get_user_model()
        try:
            # Use email if provided, otherwise use username as email
            email_to_try = email or username
            if not email_to_try:
                return None
                
            user = UserModel.objects.get(email=email_to_try)
            if user.check_password(password):
                return user
            return None
        except UserModel.DoesNotExist:
            return None

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None