from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Schema view para documentação
schema_view = get_schema_view(
    openapi.Info(
        title="Restaurant Management API",
        default_version='v1',
        description="API para gerenciar pedidos, cardápio e relatórios.",
        contact=openapi.Contact(email="support@restaurantmanagement.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Rotas de API
api_patterns = [
    path('menu/', include('menu.urls')),  # Rotas relacionadas ao menu
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # Login e token
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # Atualização do token
    path('users/', include('users.urls')),  # Rotas relacionadas a usuários
    path('api/admin-panel/', include('admin_panel.urls')),
]

# Rotas de documentação
docs_patterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

# URL principal
urlpatterns = [
    path('admin/', admin.site.urls),  # Admin
    path('api/', include(api_patterns)),  # Inclui todas as rotas de API
    path('', include('django_prometheus.urls')),  # Métricas
] + docs_patterns  # Adiciona as rotas de documentação
