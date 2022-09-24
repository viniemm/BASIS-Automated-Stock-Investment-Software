from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_parser import BaseDerivedModelParser
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_models import DerivedComplexFilter
from web_dashboard_api.base_architecture_components.filter.base_filter_collection import BaseFilterWrapperCollection
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class BaseDerivedModelProvider:
    def __init__(self,
                 filter_collection_provider: BaseFilterWrapperCollection,
                 derived_model_parser: BaseDerivedModelParser,
                 **kwargs):
        self.filter_collection_provider = filter_collection_provider
        self.derived_model_parser = derived_model_parser

    def json_to_complex_filter(self, json_complex_filter_dict) -> (QueryComplexFilter, DerivedComplexFilter):
        complex_filter_parser = self.filter_collection_provider.get_complex_filter_parser()
        parsed_complex_filter = complex_filter_parser.complex_filter_parsing(json_complex_filter_dict)
        return parsed_complex_filter

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [BaseDerivedModel]:
        return self.derived_model_parser.get_derived_model_list_from_filters(complex_filter)

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [BaseDerivedModel]:
        query_filter, derived_filter = self.json_to_complex_filter(json_complex_filter_dict)
        derived_models = self.get_derived_model_list_from_filters(query_filter)
        derived_models = self.apply_derived_filters(derived_models, derived_filter)
        return derived_models

    def apply_derived_filters(self, derived_models: [BaseDerivedModel], derived_filter: DerivedComplexFilter) -> [BaseDerivedModel]:
        filtered_array = []
        for derived_model in derived_models:
            if derived_filter.passes_filter(derived_model):
                filtered_array.append(derived_model)
        return filtered_array
