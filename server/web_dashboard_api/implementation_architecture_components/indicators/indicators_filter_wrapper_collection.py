from web_dashboard_api.base_architecture_components.filter.base_filter_collection import BaseFilterWrapperCollection
from web_dashboard_api.base_architecture_components.filter.base_filter_wrapper import QueryFilterWrapper, \
    DerivedFilterWrapper
from web_dashboard_api.base_architecture_components.filter.filter_available_implementation import \
    CategoryFilterAvailable, IntegerFilterAvailable
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_parser import DerivedFilterParser
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_validator import \
    CategoryDerivedFilterValidator
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.base_architecture_components.filter_query.query_filter_parser import QueryFilterParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import \
    CategoryQueryFilterValidator, IntegerQueryFilterValidator
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_parser import \
    IndicatorsAnalyticsDerivedModelParser


#TODO: fix this one
from web_dashboard_api.implementation_architecture_components.industries import industry_types


class IndicatorsFilterWrapperCollection(BaseFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, filter_wrappers, **kwargs):
        # IMPORTANT: Fields have to conform to django models field names (not including foreign table prefixes)
        # Years Filter
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
        # In order to filter out not needed symbols. Only pass needed symbols
        # Symbols filter
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
        # Industries Filter
        industries = []
        if "industries" in kwargs:
            industries = kwargs["industries"]
        else:
            complex_filter = QueryComplexFilter('and', [])
            indicators_derived_model_parser = IndicatorsAnalyticsDerivedModelParser(distinct_on=["symbol__industry"])
            derived_models = indicators_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            for derived_model in derived_models:
                industries.append(derived_model.industry)
        # Make sure no duplicates
        industries = list(set(industries))
        industries.sort()
        industries_list = []
        for industry in industries:
            industries_list.append(FieldValueLabel(industry, industry))
        filter_wrappers.append(
            QueryFilterWrapper(
                CategoryFilterAvailable(field="industry", label="Industry", required=False, foreign_table="symbol",
                                             options=industries_list),
                CategoryQueryFilterValidator,
                QueryFilterParser
            )
        )
        # Industry Types Filter
        # Make sure no duplicates
        industries = list(set(industry_types))
        industries.sort()
        industries_list = []
        for industry in industries:
            industries_list.append(FieldValueLabel(industry, industry))
        filter_wrappers.append(
            DerivedFilterWrapper(
                CategoryFilterAvailable(field="industry_type", label="Industry Type", required=False,
                                             options=industries_list),
                CategoryDerivedFilterValidator,
                DerivedFilterParser
            )
        )
        # Revenue Filter
        filter_wrappers.append(
            QueryFilterWrapper(
                IntegerFilterAvailable(field="revenue_bil", label="Revenue Billions", required=False),
                IntegerQueryFilterValidator,
                QueryFilterParser
            )
        )
        super().__init__(filter_wrappers)
