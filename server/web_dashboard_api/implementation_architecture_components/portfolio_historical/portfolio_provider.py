from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_provider import \
    BaseDerivedModelProvider
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_derived_model import \
    PortfolioDerivedModel
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_parser import \
    PortfolioDerivedModelParser


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class PortfolioDerivedModelProvider(BaseDerivedModelProvider):
    def __init__(self, filter_collection_provider, **kwargs):
        derived_model_parser = None
        if "derived_model_parser" in kwargs:
            # Value has to conform to django models
            derived_model_parser = kwargs["derived_model_parser"]
            del kwargs["derived_model_parser"]
        if derived_model_parser is None:
            derived_model_parser = PortfolioDerivedModelParser()
        super().__init__(filter_collection_provider, derived_model_parser, **kwargs)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [PortfolioDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        return derived_models

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [PortfolioDerivedModel]:
        return super().get_derived_model_list_from_json_filters(json_complex_filter_dict)

