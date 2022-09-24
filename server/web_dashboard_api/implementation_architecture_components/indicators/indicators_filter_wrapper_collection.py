from web_dashboard_api.base_architecture_components.filter.base_filter_collection import BaseFilterWrapperCollection
from web_dashboard_api.base_architecture_components.filter.base_filter_wrapper import QueryFilterWrapper
from web_dashboard_api.base_architecture_components.filter.filter_available_implementation import \
    CategoryFilterAvailable, IntegerFilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.base_architecture_components.filter_query.query_filter_parser import QueryFilterParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import \
    CategoryQueryFilterValidator, IntegerQueryFilterValidator
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_parser import \
    IndicatorsAnalyticsDerivedModelParser


#TODO: fix this one
class IndicatorsFilterWrapperCollection(BaseFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, filter_wrappers, **kwargs):
        # IMPORTANT: Fields have to conform to django models field names (not including foreign table prefixes)
        years = []
        if "years" in kwargs:
            years = kwargs["years"]
        else:
            complex_filter = QueryComplexFilter('and', [])
            indicators_derived_model_parser = IndicatorsAnalyticsDerivedModelParser(distinct_on=["year"])
            derived_models = indicators_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            for derived_model in derived_models:
                years.append((derived_model.year, derived_model.year))
        # Make sure no duplicates
        years = list(set(years))
        years.sort()
        years_list = []
        for value, label in years:
            years_list.append(FieldValueLabel(value, label))
        filter_wrappers.append(
            QueryFilterWrapper(
                CategoryFilterAvailable(field="year", label="Report Year", required=False,
                                             options=years_list),
                CategoryQueryFilterValidator,
                QueryFilterParser
            )
        )
        # In order to filter out not needed part numbers. Only pass needed part numbers
        symbols = []
        if "symbols" in kwargs:
            symbols = kwargs["symbols"]
        else:
            complex_filter = QueryComplexFilter('and', [])
            indicators_derived_model_parser = IndicatorsAnalyticsDerivedModelParser(distinct_on=["symbol"])
            derived_models = indicators_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            for derived_model in derived_models:
                symbols.append(derived_model.symbol)
        # Make sure no duplicates
        symbols = list(set(symbols))
        symbols.sort()
        symbols_list = []
        for symbol in symbols:
            symbols_list.append(FieldValueLabel(symbol, symbol))
        filter_wrappers.append(
            QueryFilterWrapper(
                CategoryFilterAvailable(field="symbol", label="Symbol", required=False,
                                             options=symbols_list),
                CategoryQueryFilterValidator,
                QueryFilterParser
            )
        )
        filter_wrappers.append(
            QueryFilterWrapper(
                IntegerFilterAvailable(field="revenue_bil", label="Revenue Billions", required=False),
                IntegerQueryFilterValidator,
                QueryFilterParser
            )
        )
        super().__init__(filter_wrappers)
