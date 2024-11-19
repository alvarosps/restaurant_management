from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if self.stock < 0:
            raise ValueError("Stock cannot be negative.")
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name