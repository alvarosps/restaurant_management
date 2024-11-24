from rest_framework.views import APIView
from rest_framework.generics import ListAPIView, RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from django.contrib.auth import get_user_model
from .serializers import UserSerializer, CreateUserSerializer, UpdateUserSerializer


User = get_user_model()

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class UserListView(ListAPIView):
    """
    View para listar todos os usuários. Apenas administradores têm permissão.
    """
    queryset = User.objects.all().select_related()
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]


class UserDetailView(RetrieveAPIView):
    """
    View para obter os detalhes de um usuário.
    Usuários comuns só podem acessar seus próprios dados.
    """
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)


class UserCreateView(APIView):
    """
    View pública para criar usuários.
    Usuários criados não podem ser administradores ou superusuários.
    """
    permission_classes = [AllowAny]


    def post(self, request):
        serializer = CreateUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            user.is_staff = False
            user.is_superuser = False
            user.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserUpdateView(UpdateAPIView):
    """
    View para atualizar dados de usuários.
    Usuários comuns só podem atualizar seus próprios dados.
    Administradores podem atualizar qualquer usuário.
    """
    serializer_class = UpdateUserSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        if self.request.user.is_staff:
            return User.objects.all()
        return User.objects.filter(id=self.request.user.id)


    def perform_update(self, serializer):
        if not self.request.user.is_staff:
            serializer.save(is_staff=False, is_superuser=False)
        else:
            serializer.save()


class UserDeleteView(DestroyAPIView):
    """
    View para excluir usuários. Apenas administradores têm permissão.
    Não permite que um administrador exclua a si mesmo.
    """
    queryset = User.objects.all()
    permission_classes = [IsAdminUser]


    def perform_destroy(self, instance):
        if instance == self.request.user:
            raise PermissionDenied("Você não pode excluir a si mesmo.")
        super().perform_destroy(instance)




