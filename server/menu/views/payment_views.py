import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from menu.serializers.payment_serializers import PaymentRequestSerializer
from menu.models.order import Order

class CreatePaymentSessionView(APIView):
    def post(self, request):
        serializer = PaymentRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                session = stripe.checkout.Session.create(
                    payment_method_types=['card'],
                    line_items=[
                        {
                            'price_data': {
                                'currency': 'usd',
                                'product_data': {
                                    'name': serializer.validated_data['item_name'],
                                },
                                'unit_amount': int(serializer.validated_data['price'] * 100),
                            },
                            'quantity': serializer.validated_data['quantity'],
                        },
                    ],
                    mode='payment',
                    success_url='http://localhost:3000/payment-success',
                    cancel_url='http://localhost:3000/payment-cancel',
                )
                return Response({'sessionId': session.id}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProcessPaymentView(APIView):
    def post(self, request):
        try:
            table_number = request.data.get('table_number')
            if not table_number:
                return Response({'error': 'Table number is required'}, status=status.HTTP_400_BAD_REQUEST)
            
            orders = Order.objects.filter(table_number=table_number, status='Pending')
            if not orders.exists():
                return Response({'error': 'No pending orders for this table'}, status=status.HTTP_404_NOT_FOUND)
            
            for order in orders:
                order.status = 'Paid'
                order.save()

            return Response({'status': 'Payment successful', 'orders': orders.count()}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)