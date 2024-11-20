from django.urls import path
from menu.views.menu_views import MenuItemListCreateView, MenuItemDetailView
from menu.views.order_views import OrderListCreateView, CancelOrderView, UserOrderHistoryView, RefundOrderView
from menu.views.report_views import ReportView, ReportAnalysisView, ExportReportCSVView, ExportReportPDFView
from menu.views.payment_views import CreatePaymentSessionView
from menu.views.stock_views import UpdateStockView

urlpatterns = [
    path('menu-items/', MenuItemListCreateView.as_view(), name='menu-items'),
    path('menu-items/<int:pk>/', MenuItemDetailView.as_view(), name='menu-item-detail'),
    path('menu-items/<int:pk>/update-stock/', UpdateStockView.as_view(), name='update-stock'),
    path('orders/', OrderListCreateView.as_view(), name='orders'),
    path('reports/', ReportView.as_view(), name='reports'),
    path('report-analysis/', ReportAnalysisView.as_view(), name='report-analysis'),
    path('create-payment-session/', CreatePaymentSessionView.as_view(), name='create-payment-session'),
    path('orders/<int:pk>/cancel/', CancelOrderView.as_view(), name='cancel-order'),
    path('orders/history/', UserOrderHistoryView.as_view(), name='user-order-history'),
    path('orders/<int:pk>/refund/', RefundOrderView.as_view(), name='refund-order'),
    path('reports/export-csv/', ExportReportCSVView.as_view(), name='export-report-csv'),
    path('reports/export-pdf/', ExportReportPDFView.as_view(), name='export-report-pdf'),
]
