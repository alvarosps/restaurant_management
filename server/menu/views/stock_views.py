from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from menu.models.menu_item import MenuItem

class UpdateStockView(APIView):
    def patch(self, request, pk):
        try:
            item = MenuItem.objects.get(pk=pk)
            stock = request.data.get('stock')

            if not isinstance(stock, int) or stock < 0:
                return Response({'error': 'Invalid stock value'}, status=status.HTTP_400_BAD_REQUEST)

            item.stock = stock
            item.save()
            return Response({'status': 'Stock updated', 'new_stock': item.stock}, status=status.HTTP_200_OK)
        except MenuItem.DoesNotExist:
            return Response({'error': 'Menu item not found'}, status=status.HTTP_404_NOT_FOUND)


