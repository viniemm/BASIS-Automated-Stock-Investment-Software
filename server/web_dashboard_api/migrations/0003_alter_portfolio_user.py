# Generated by Django 4.0.7 on 2022-10-26 13:06

from django.conf import settings
from django.db import migrations, models
import web_dashboard_api.models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('web_dashboard_api', '0002_portfolio_portfolioselection'),
    ]

    operations = [
        migrations.AlterField(
            model_name='portfolio',
            name='user',
            field=models.ForeignKey(null=True, on_delete=models.SET(web_dashboard_api.models.get_parked_user), related_name='portfolios', to=settings.AUTH_USER_MODEL),
        ),
    ]
