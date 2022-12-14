# Generated by Django 4.1.1 on 2022-09-24 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('symbol', models.CharField(max_length=5, primary_key=True, serialize=False)),
                ('exchange', models.CharField(max_length=5)),
                ('short_name', models.CharField(max_length=100)),
                ('long_name', models.CharField(max_length=100)),
                ('sector', models.CharField(max_length=100)),
                ('industry', models.CharField(max_length=100)),
                ('current_price', models.DecimalField(decimal_places=3, max_digits=8)),
                ('market_cap', models.BigIntegerField()),
                ('ebitda', models.DecimalField(blank=True, decimal_places=1, max_digits=16, null=True)),
                ('revenue_growth', models.DecimalField(blank=True, decimal_places=3, max_digits=8, null=True)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(blank=True, max_length=100, null=True)),
                ('country', models.CharField(max_length=100)),
                ('full_time_employees', models.IntegerField(blank=True, null=True)),
                ('long_business_summary', models.CharField(max_length=3000)),
                ('weight', models.FloatField()),
            ],
            options={
                'db_table': 'companies',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Indicators',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('year', models.IntegerField()),
                ('revenue', models.FloatField(blank=True, null=True)),
                ('revenue_growth', models.FloatField(blank=True, null=True)),
                ('gross_profit', models.FloatField(blank=True, null=True)),
                ('rd_expenses', models.FloatField(blank=True, null=True)),
                ('operating_expenses', models.FloatField(blank=True, null=True)),
                ('operating_income', models.FloatField(blank=True, null=True)),
                ('interest_expense', models.FloatField(blank=True, null=True)),
                ('net_income', models.FloatField(blank=True, null=True)),
                ('dividend_per_share', models.FloatField(blank=True, null=True)),
                ('profit_margin', models.FloatField(blank=True, null=True)),
                ('ebitda', models.FloatField(blank=True, null=True)),
                ('ebit', models.FloatField(blank=True, null=True)),
                ('total_current_assets', models.FloatField(blank=True, null=True)),
                ('total_assets', models.FloatField(blank=True, null=True)),
                ('total_debt', models.FloatField(blank=True, null=True)),
                ('total_liabilities', models.FloatField(blank=True, null=True)),
                ('total_shareholders_equity', models.FloatField(blank=True, null=True)),
                ('investments', models.FloatField(blank=True, null=True)),
                ('dividend_payments', models.FloatField(blank=True, null=True)),
                ('netprofitmargin', models.FloatField(blank=True, null=True)),
                ('revenue_per_share', models.FloatField(blank=True, null=True)),
                ('net_income_per_share', models.FloatField(blank=True, null=True)),
                ('free_cash_flow_per_share', models.FloatField(blank=True, null=True)),
                ('cash_per_share', models.FloatField(blank=True, null=True)),
                ('market_cap', models.FloatField(blank=True, null=True)),
                ('pe_ratio', models.FloatField(blank=True, null=True)),
                ('debt_to_equity', models.FloatField(blank=True, null=True)),
                ('debt_to_assets', models.FloatField(blank=True, null=True)),
                ('dividend_yield', models.FloatField(blank=True, null=True)),
                ('rd_to_revenue', models.FloatField(blank=True, null=True)),
                ('gross_profit_growth', models.FloatField(blank=True, null=True)),
                ('net_income_growth', models.FloatField(blank=True, null=True)),
                ('weighted_average_shares_growth', models.FloatField(blank=True, null=True)),
                ('free_cash_flow_growth', models.FloatField(blank=True, null=True)),
                ('field_10y_revenue_growth_per_share', models.FloatField(blank=True, db_column='_10y_revenue_growth_per_share', null=True)),
                ('field_5y_revenue_growth_per_share', models.FloatField(blank=True, db_column='_5y_revenue_growth_per_share', null=True)),
                ('field_3y_revenue_growth_per_share', models.FloatField(blank=True, db_column='_3y_revenue_growth_per_share', null=True)),
                ('field_10y_net_income_growth_per_share', models.FloatField(blank=True, db_column='_10y_net_income_growth_per_share', null=True)),
                ('field_5y_net_income_growth_per_share', models.FloatField(blank=True, db_column='_5y_net_income_growth_per_share', null=True)),
                ('field_3y_net_income_growth_per_share', models.FloatField(blank=True, db_column='_3y_net_income_growth_per_share', null=True)),
                ('asset_growth', models.FloatField(blank=True, null=True)),
                ('debt_growth', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'indicators',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StocksData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('index', models.BigIntegerField(blank=True, null=True)),
                ('date', models.TextField(blank=True, null=True)),
                ('adj_close', models.FloatField(blank=True, db_column='adj close', null=True)),
                ('close', models.FloatField(blank=True, null=True)),
                ('high', models.FloatField(blank=True, null=True)),
                ('low', models.FloatField(blank=True, null=True)),
                ('open', models.FloatField(blank=True, null=True)),
                ('volume', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'stocks_data',
                'managed': False,
            },
        ),
    ]
