import typing

from django.db.models import QuerySet

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_parser import \
    BaseDerivedModelParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.industries import get_industry_type_dict
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_derived_model import \
    PortfolioDerivedModel
from web_dashboard_api.implementation_architecture_components.stocks_historical.stocks_derived_model import \
    StocksDerivedModel
from web_dashboard_api.models import PortfolioSelection


class PortfolioDerivedModelParser(BaseDerivedModelParser):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def complex_filter_to_query(self, complex_filter: QueryComplexFilter):
        return super().complex_filter_to_query(complex_filter)

    def apply_complex_filter(self, complex_filter: QueryComplexFilter) -> QuerySet:
        filtered = PortfolioSelection.objects.complex_filter(self.complex_filter_to_query(complex_filter))
        # Adding time filter
        # date_from = datetime.now(pytz.timezone('America/Chicago')) - timedelta(hours=24)
        # date_from = date_from.replace(tzinfo=pytz.utc)
        # filtered = filtered.filter(last_update__gte=date_from)
        return filtered

    def get_derived_model_class(self) -> typing.Type[PortfolioDerivedModel]:
        return PortfolioDerivedModel

    def get_queryset_value_list(self) -> [str]:
        values_list = []
        values_list.append("symbol")
        values_list.append("portfolio__name")
        values_list.append("allocation")
        values_list.append("portfolio__value")
        values_list.append("symbol__industry")
        return values_list

    def get_derived_model_field_list(self) -> [str]:
        values_list = []
        values_list.append("symbol")
        values_list.append("name")
        values_list.append("allocation")
        values_list.append("initial_value")
        values_list.append("industry")
        return values_list

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [StocksDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        # Add additional properties here and filter out stuff based on derived models in get_derived_model_list_from_filters in Provider
        # Getting Additional derived model properties
        # Adding an industry type
        industry_to_type = get_industry_type_dict()
        for derived_model in derived_models:
            if derived_model.industry in industry_to_type:
                derived_model.industry_type = industry_to_type[derived_model.industry]
        return derived_models
