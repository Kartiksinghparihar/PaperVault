from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class LoginSerializer(TokenObtainPairSerializer):
    username_field = "login_id"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token["login_id"] = user.login_id
        token["name"] = user.name
        token["role"] = user.role

        return token