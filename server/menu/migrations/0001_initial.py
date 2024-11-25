# Generated by Django 5.1.3 on 2024-11-19 19:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='MenuItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('stock', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='OrderAudit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=50)),
                ('changed_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_number', models.PositiveIntegerField(blank=True, help_text='Table number for unauthenticated users', null=True)),
                ('quantity', models.PositiveIntegerField()),
                ('notes', models.TextField(blank=True)),
                ('status', models.CharField(default='Pending', max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('payment_id', models.CharField(blank=True, max_length=255, null=True)),
                ('menu_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='orders', to='menu.menuitem')),
            ],
        ),
    ]
