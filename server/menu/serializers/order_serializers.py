from rest_framework import serializers
from menu.models.order import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        extra_kwargs = {
            "table_number": {"required": True},
        }

class UserOrderHistorySerializer(serializers.ModelSerializer):
    menu_item__name = serializers.CharField(source='menu_item.name')

    class Meta:
        model = Order
        fields = ['menu_item__name', 'quantity', 'status', 'created_at']