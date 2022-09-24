from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.indicators.indicators_derived_model import \
    IndicatorsDerivedModel
from web_dashboard_api.implementation_architecture_components.indicators.indicators_provider import \
    IndicatorsDerivedModelProvider
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_filter_wrapper_collection import \
    IndicatorsAnalyticsFilterWrapperCollection
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_parser import \
    IndicatorsAnalyticsDerivedModelParser


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class IndicatorsAnalyticsDerivedModelProvider(IndicatorsDerivedModelProvider):
    def __init__(self, **kwargs):
        if "derived_model_parser" not in kwargs:
            kwargs["derived_model_parser"] = IndicatorsAnalyticsDerivedModelParser()
        if "filter_collection_provider" not in kwargs:
            kwargs["filter_collection_provider"] = IndicatorsAnalyticsFilterWrapperCollection()
        super().__init__(**kwargs)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [IndicatorsDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        return derived_models

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [IndicatorsDerivedModel]:
        return super().get_derived_model_list_from_json_filters(json_complex_filter_dict)

