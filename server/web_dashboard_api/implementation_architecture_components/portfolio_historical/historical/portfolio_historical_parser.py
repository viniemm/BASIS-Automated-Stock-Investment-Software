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
            if len(base_filter.filters) > 0 and base_filter.filters[0].field == field:
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
                if merged['close'] is not None and merged['allocation'] is not None:
                    derived_models.append(PortfolioDerivedModel(**merged))
        # Eliminate all the stocks before the max initial date
        max_start_date = {}
        for derived_model in derived_models:
            if derived_model.symbol not in max_start_date:
                max_start_date[derived_model.symbol] = derived_model.date
        max_start = max(max_start_date.values())
        new_derived_models = []
        for derived_model in derived_models:
            if derived_model.date > max_start:
                new_derived_models.append(derived_model)
        derived_models = new_derived_models
        # Create proportional allocation
        symbol_dict = defaultdict(dict)
        for derived_model in derived_models:
            if derived_model.symbol not in symbol_dict[derived_model.portfolio_name]:
                symbol_dict[derived_model.portfolio_name][derived_model.symbol] = 100 / derived_model.close * derived_model.allocation
            derived_model.closing_proportional = derived_model.close * symbol_dict[derived_model.portfolio_name][derived_model.symbol]
        return derived_models
