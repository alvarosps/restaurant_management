from rest_framework.generics import RetrieveAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny
from menu.models.menu_item import MenuItem
from menu.serializers.menu_serializers import MenuItemSerializer


class MenuItemListCreateView(ListCreateAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
    permission_classes = [AllowAny] 
    
class MenuItemDetailView(RetrieveAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuItemSerializer
 