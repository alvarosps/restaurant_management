import stripe
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from menu.serializers.payment_serializers import PaymentRequestSerializer

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
        # Retorna erros de validação se houver
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
