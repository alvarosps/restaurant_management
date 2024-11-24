import stripe
from django.conf import settings
from rest_framework.generics import ListCreateAPIView
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from rest_framework import status, serializers
from menu.models.order import Order
from menu.models.order_audit import OrderAudit
from menu.serializers.order_serializers import OrderSerializer, UserOrderHistorySerializer, TableOrderSerializer
from menu.metrics import cancel_counter

stripe.api_key = settings.STRIPE_SECRET_KEY


class AdvanceOrderStatusView(APIView):
    """
    API para avançar o status de um pedido
    """

    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
            if order.status == "Pending":
                order.status = "In Progress"
            elif order.status == "In Progress":
                order.status = "Complete"
            else:
                raise ValidationError("O pedido já está no estado final.")
            
            order.save()

            OrderAudit.objects.create(order=order, status=order.status)

            return Response({"message": "Estado do pedido atualizado com sucesso.", "status": order.status}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({"error": "Pedido não encontrado."}, status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class OrderListCreateView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        table_number = self.request.data.get('table_number')
        if not self.request.user.is_authenticated and not table_number:
            raise serializers.ValidationError("Table number is required for unauthenticated orders.")
        menu_item = serializer.validated_data['menu_item']
        quantity = serializer.validated_data['quantity']
        if menu_item.stock < quantity:
            raise serializers.ValidationError("Insufficient stock.")
        menu_item.stock -= quantity
        menu_item.save()
        serializer.save(user=self.request.user if self.request.user.is_authenticated else None)

class CancelOrderView(APIView):
    def patch(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, status='Pending')
            order.status = 'Cancelled'
            order.save()

            OrderAudit.objects.create(order=order, status='Cancelled')

            cancel_counter.inc()  # Incrementa o contador de cancelamentos
            return Response({'status': 'Order cancelled'}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found or cannot be cancelled'}, status=status.HTTP_404_NOT_FOUND)

class UserOrderHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_staff:  # Admin users
            orders = Order.objects.all()
        else:  # Regular users
            orders = Order.objects.filter(user=request.user)
        serializer = UserOrderHistorySerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RefundOrderView(APIView):
    def post(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, status='Paid')
            if not order.payment_id:
                return Response({'error': 'No payment ID associated with this order'}, status=status.HTTP_400_BAD_REQUEST)

            # Integração com Stripe para reembolsar
            stripe.Refund.create(
                charge=order.payment_id  # Certifique-se de armazenar o ID do pagamento no pedido
            )
            order.status = 'Refunded'
            order.save()

            OrderAudit.objects.create(order=order, status='Refunded')  # Registrar auditoria
            return Response({'status': 'Order refunded'}, status=status.HTTP_200_OK)
        except Order.DoesNotExist:
            return Response({'error': 'Order not found or cannot be refunded'}, status=status.HTTP_404_NOT_FOUND)
        except stripe.error.InvalidRequestError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class TableOrderView(APIView):
    def get(self, request, table_number):
        orders = Order.objects.filter(table_number=table_number).order_by('-created_at')
        if not orders.exists():
            return Response({'message': 'No orders found for this table number'}, status=status.HTTP_404_NOT_FOUND)
        serializer = TableOrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)