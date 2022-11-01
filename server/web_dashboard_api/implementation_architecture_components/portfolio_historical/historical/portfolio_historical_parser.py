from django.db.models import QuerySet

from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter, \
    QueryFilter
from web_dashboard_api.base_architecture_components.filter_query.query_operator_models import EqualsQueryOperator
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_derived_model import \
    PortfolioDerivedModel
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_parser import \
    PortfolioDerivedModelParser
from web_dashboard_api.implementation_architecture_components.stocks_historical.stocks_parser import \
    StocksDerivedModelParser


class PortfolioHistoricalDerivedModelParser(PortfolioDerivedModelParser):

    def apply_complex_filter(self, complex_filter: QueryComplexFilter) -> QuerySet:
        return super().apply_complex_filter(complex_filter)

    def contains_field(self, base_filter, field):
        if isinstance(base_filter, QueryComplexFilter):
            if len(base_filter.filters) > 0 and base_filter.filters[0].filed == field:
                return True
        elif base_filter.field == field:
            return True
        return False

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [PortfolioDerivedModel]:
        # do not pass date filter into query request
        stocks_complex_filter = QueryComplexFilter('and', [])
        portfolio_complex_filter = QueryComplexFilter(complex_filter.logic, [])
        for base_filter in complex_filter.filters:
            if self.contains_field(base_filter, 'date'):
                stocks_complex_filter.filters.append(base_filter)
            else:
                portfolio_complex_filter.filters.append(base_filter)
        derived_models = super().get_derived_model_list_from_filters(portfolio_complex_filter)
        from collections import defaultdict
        portfolio_dict = defaultdict(list)
        symbol_set = set()
        for derived_model in derived_models:
            portfolio_dict[derived_model.symbol].append(derived_model)
            symbol_set.add(derived_model.symbol)
        # Get all the stocks data
        symbol_complex_filter = QueryComplexFilter('or', [])
        for symbol in symbol_set:
            symbol_complex_filter.filters.append(QueryFilter('symbol', symbol, EqualsQueryOperator()))
        stocks_complex_filter.filters.append(symbol_complex_filter)
        stocks_models = StocksDerivedModelParser().get_derived_model_list_from_filters(stocks_complex_filter)
        # Create portfolio derived models
        derived_models = []
        for stocks_model in stocks_models:
            for portfolio in portfolio_dict[stocks_model.symbol]:
                merged = portfolio.__dict__
                for attr, val in stocks_model.__dict__.items():
                    merged[attr] = val
                derived_models.append(PortfolioDerivedModel(**merged))
        return derived_models
