from django.urls import path
from menu.views.menu_views import MenuItemListCreateView, MenuItemDetailView
from menu.views.order_views import OrderListCreateView, CancelOrderView, UserOrderHistoryView, RefundOrderView, TableOrderView, AdvanceOrderStatusView
from menu.views.report_views import ReportView, ReportAnalysisView, ExportReportCSVView, ExportReportPDFView
from menu.views.payment_views import CreatePaymentSessionView, ProcessPaymentView
from menu.views.stock_views import UpdateStockView
from menu.views.recommendation_views import RecommendationView

urlpatterns = [
    path('items/', MenuItemListCreateView.as_view(), name='menu-items'),
    path('items/<int:pk>/', MenuItemDetailView.as_view(), name='menu-item-detail'),
    path('items/<int:pk>/update-stock/', UpdateStockView.as_view(), name='update-stock'),
    path('orders/', OrderListCreateView.as_view(), name='orders'),
    path('reports/', ReportView.as_view(), name='reports'),
    path('report-analysis/', ReportAnalysisView.as_view(), name='report-analysis'),
    path('create-payment-session/', CreatePaymentSessionView.as_view(), name='create-payment-session'),
    path('orders/<int:pk>/cancel/', CancelOrderView.as_view(), name='cancel-order'),
    path('orders/history/', UserOrderHistoryView.as_view(), name='user-order-history'),
    path('orders/<int:pk>/refund/', RefundOrderView.as_view(), name='refund-order'),
    path('orders/table/<str:table_number>/', TableOrderView.as_view(), name='table-orders'),
    path('orders/payment/', ProcessPaymentView.as_view(), name='process-payment'),
    path('orders/<int:pk>/advance-status/', AdvanceOrderStatusView.as_view(), name='advance-order-status'),
    path('reports/export-csv/', ExportReportCSVView.as_view(), name='export-report-csv'),
    path('reports/export-pdf/', ExportReportPDFView.as_view(), name='export-report-pdf'),
    path('recommendations/', RecommendationView.as_view(), name='recommendations'),
]
