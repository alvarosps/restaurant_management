from rest_framework import serializers

class PaymentRequestSerializer(serializers.Serializer):
    item_name = serializers.CharField(max_length=100)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    quantity = serializers.IntegerField(min_value=1)
