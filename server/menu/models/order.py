from django.db import models
from django.conf import settings
from menu.models.menu_item import MenuItem

STATUS_CHOICES = [
    ("Pending", "Pending"),
    ("In Progress", "In Progress"),
    ("Complete", "Complete"),
    ("Paid", "Paid"),
    ("Cancelled", "Cancelled"),
    ("Refunded", "Refunded"),
]

class Order(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="orders",
    )
    table_number = models.PositiveIntegerField(
        null=True, blank=True, help_text="Table number for unauthenticated users"
    )
    menu_item = models.ForeignKey(MenuItem, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)
    payment_id = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"Order {self.id} - {self.menu_item.name}"
