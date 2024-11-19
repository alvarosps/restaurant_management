from django.db.models import Count, F, DateTimeField
from django.db.models.functions import TruncHour
from menu.models.menu_item import MenuItem
from menu.models.order import Order

def get_top_items(limit=5):
    """Retorna os itens mais pedidos com base na contagem de pedidos."""
    return Order.objects.values(name=F('menu_item__name')).annotate(
        total_orders=Count('id')
    ).order_by('-total_orders')[:limit]

def get_peak_hours(limit=5):
    """Retorna os horários de maior movimento com base na contagem de pedidos."""
    return Order.objects.annotate(
        hour=TruncHour('created_at', output_field=DateTimeField())
    ).values('hour').annotate(
        total_orders=Count('id')
    ).order_by('-total_orders')[:limit]

def get_menu_item_report():
    """Gera relatório dos itens do menu com a contagem total de pedidos."""
    return MenuItem.objects.annotate(total_orders=Count('orders')).order_by('-total_orders')
