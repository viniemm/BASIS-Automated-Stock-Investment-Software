from django.db.models import QuerySet

from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_derived_model import \
    PortfolioDerivedModel
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_parser import \
    PortfolioDerivedModelParser


class PortfolioHistoricalDerivedModelParser(PortfolioDerivedModelParser):

    def apply_complex_filter(self, complex_filter: QueryComplexFilter) -> QuerySet:
        return super().apply_complex_filter(complex_filter)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [PortfolioDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        return derived_models
