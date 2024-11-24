from rest_framework import serializers
from menu.models.order import Order
from menu.models.order_audit import OrderAudit

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        extra_kwargs = {
            "table_number": {"required": True},
        }

class UserOrderHistorySerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source='menu_item.name')

    class Meta:
        model = Order
        fields = ['id', 'menu_item_name', 'quantity', 'status', 'created_at', 'table_number']
        
class TableOrderSerializer(serializers.ModelSerializer):
    menu_item_name = serializers.CharField(source='menu_item.name', read_only=True)
    menu_item_price = serializers.FloatField(source='menu_item.price', read_only=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'table_number',
            'menu_item_name',
            'menu_item_price',
            'quantity',
            'status',
            'created_at',
        ]

class OrderAuditSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAudit
        fields = ['id', 'order', 'status', 'changed_at']