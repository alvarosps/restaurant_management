from django.urls import path
from .views import UserListView, UserDetailView, UserCreateView, UserUpdateView, UserDeleteView, CurrentUserView

urlpatterns = [
    path('', UserListView.as_view(), name='user-list'),                # List all users (Admin only)
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),   # Get specific user details
    path('create/', UserCreateView.as_view(), name='user-create'),     # Create a new user (Admin only)
    path('<int:pk>/update/', UserUpdateView.as_view(), name='user-update'), # Update user details
    path('<int:pk>/delete/', UserDeleteView.as_view(), name='user-delete'), # Delete a user (Admin only)
    path('me/', CurrentUserView.as_view(), name='user-me'),
]
