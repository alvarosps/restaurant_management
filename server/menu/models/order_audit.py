from django.db import models
from menu.models.order import Order

class OrderAudit(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='audits')
    status = models.CharField(max_length=50)
    changed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"OrderAudit - Order {self.order.id} - Status: {self.status}"
