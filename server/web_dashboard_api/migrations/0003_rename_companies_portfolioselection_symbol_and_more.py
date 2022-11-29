# Generated by Django 4.1.2 on 2022-11-01 01:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_dashboard_api', '0002_portfolio_portfolioselection'),
    ]

    operations = [
        migrations.RenameField(
            model_name='portfolioselection',
            old_name='companies',
            new_name='symbol',
        ),
        migrations.AddField(
            model_name='portfolio',
            name='value',
            field=models.FloatField(default=0),
        ),
    ]