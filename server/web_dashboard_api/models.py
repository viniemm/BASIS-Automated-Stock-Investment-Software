# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Companies(models.Model):
    symbol = models.CharField(primary_key=True, max_length=5)
    exchange = models.CharField(max_length=5)
    short_name = models.CharField(max_length=100)
    long_name = models.CharField(max_length=100)
    sector = models.CharField(max_length=100)
    industry = models.CharField(max_length=100)
    current_price = models.DecimalField(max_digits=8, decimal_places=3)
    market_cap = models.BigIntegerField()
    ebitda = models.DecimalField(max_digits=16, decimal_places=1, blank=True, null=True)
    revenue_growth = models.DecimalField(max_digits=8, decimal_places=3, blank=True, null=True)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    country = models.CharField(max_length=100)
    full_time_employees = models.IntegerField(blank=True, null=True)
    long_business_summary = models.CharField(max_length=3000)
    weight = models.FloatField()

    class Meta:
        managed = False
        db_table = 'companies'


class Indicators(models.Model):
    id = models.IntegerField(primary_key=True)
    year = models.IntegerField()
    symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol')
    revenue = models.FloatField(blank=True, null=True)
    revenue_growth = models.FloatField(blank=True, null=True)
    gross_profit = models.FloatField(blank=True, null=True)
    rd_expenses = models.FloatField(blank=True, null=True)
    operating_expenses = models.FloatField(blank=True, null=True)
    operating_income = models.FloatField(blank=True, null=True)
    interest_expense = models.FloatField(blank=True, null=True)
    net_income = models.FloatField(blank=True, null=True)
    dividend_per_share = models.FloatField(blank=True, null=True)
    profit_margin = models.FloatField(blank=True, null=True)
    ebitda = models.FloatField(blank=True, null=True)
    ebit = models.FloatField(blank=True, null=True)
    total_current_assets = models.FloatField(blank=True, null=True)
    total_assets = models.FloatField(blank=True, null=True)
    total_debt = models.FloatField(blank=True, null=True)
    total_liabilities = models.FloatField(blank=True, null=True)
    total_shareholders_equity = models.FloatField(blank=True, null=True)
    investments = models.FloatField(blank=True, null=True)
    dividend_payments = models.FloatField(blank=True, null=True)
    netprofitmargin = models.FloatField(blank=True, null=True)
    revenue_per_share = models.FloatField(blank=True, null=True)
    net_income_per_share = models.FloatField(blank=True, null=True)
    free_cash_flow_per_share = models.FloatField(blank=True, null=True)
    cash_per_share = models.FloatField(blank=True, null=True)
    market_cap = models.FloatField(blank=True, null=True)
    pe_ratio = models.FloatField(blank=True, null=True)
    debt_to_equity = models.FloatField(blank=True, null=True)
    debt_to_assets = models.FloatField(blank=True, null=True)
    dividend_yield = models.FloatField(blank=True, null=True)
    rd_to_revenue = models.FloatField(blank=True, null=True)
    gross_profit_growth = models.FloatField(blank=True, null=True)
    net_income_growth = models.FloatField(blank=True, null=True)
    weighted_average_shares_growth = models.FloatField(blank=True, null=True)
    free_cash_flow_growth = models.FloatField(blank=True, null=True)
    field_10y_revenue_growth_per_share = models.FloatField(db_column='_10y_revenue_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    field_5y_revenue_growth_per_share = models.FloatField(db_column='_5y_revenue_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    field_3y_revenue_growth_per_share = models.FloatField(db_column='_3y_revenue_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    field_10y_net_income_growth_per_share = models.FloatField(db_column='_10y_net_income_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    field_5y_net_income_growth_per_share = models.FloatField(db_column='_5y_net_income_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    field_3y_net_income_growth_per_share = models.FloatField(db_column='_3y_net_income_growth_per_share', blank=True, null=True)  # Field renamed because it started with '_'.
    asset_growth = models.FloatField(blank=True, null=True)
    debt_growth = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'indicators'


class StocksData(models.Model):
    index = models.BigIntegerField(blank=True, null=True)
    date = models.TextField(blank=True, null=True)
    symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol', blank=True, null=True)
    close = models.FloatField(blank=True, null=True)
    volume = models.FloatField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'stocks_data'
