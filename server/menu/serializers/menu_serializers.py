from rest_framework import serializers
from menu.models.menu_item import MenuItem

class MenuItemSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=10, decimal_places=2, coerce_to_string=False)

    class Meta:
        model = MenuItem
        fields = '__all__'