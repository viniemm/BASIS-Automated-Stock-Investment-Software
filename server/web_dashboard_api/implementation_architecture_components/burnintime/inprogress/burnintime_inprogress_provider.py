from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_derived_model import \
    BurnInTimeDerivedModel
from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_provider import \
    BurnInTimeDerivedModelProvider
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_filter_wrapper_collection import \
    BurnInTimeInProgressFilterWrapperCollection
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_parser import \
    BurnInTimeInProgressDerivedModelParser


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class BurnInTimeInProgressDerivedModelProvider(BurnInTimeDerivedModelProvider):
    def __init__(self, **kwargs):
        if "derived_model_parser" not in kwargs:
            kwargs["derived_model_parser"] = BurnInTimeInProgressDerivedModelParser()
        if "filter_collection_provider" not in kwargs:
            kwargs["filter_collection_provider"] = BurnInTimeInProgressFilterWrapperCollection()
        super().__init__(**kwargs)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [BurnInTimeDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        return derived_models

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [BurnInTimeDerivedModel]:
        return super().get_derived_model_list_from_json_filters(json_complex_filter_dict)

