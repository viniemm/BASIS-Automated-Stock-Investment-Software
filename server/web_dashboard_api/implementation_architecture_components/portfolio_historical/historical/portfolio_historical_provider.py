from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.portfolio_historical.historical.portfolio_historical_filter_wrapper_collection import \
    PortfolioHistoricalFilterWrapperCollection
from web_dashboard_api.implementation_architecture_components.portfolio_historical.historical.portfolio_historical_parser import \
    PortfolioHistoricalDerivedModelParser
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_derived_model import \
    PortfolioDerivedModel
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_provider import \
    PortfolioDerivedModelProvider


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class PortfolioHistoricalDerivedModelProvider(PortfolioDerivedModelProvider):
    def __init__(self, **kwargs):
        if "derived_model_parser" not in kwargs:
            kwargs["derived_model_parser"] = PortfolioHistoricalDerivedModelParser()
        if "filter_collection_provider" not in kwargs:
            kwargs["filter_collection_provider"] = PortfolioHistoricalFilterWrapperCollection()
        super().__init__(**kwargs)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [PortfolioDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        return derived_models

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [PortfolioDerivedModel]:
        return super().get_derived_model_list_from_json_filters(json_complex_filter_dict)

