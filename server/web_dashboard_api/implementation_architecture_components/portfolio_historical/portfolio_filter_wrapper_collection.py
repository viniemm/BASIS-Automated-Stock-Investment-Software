from web_dashboard_api.base_architecture_components.filter.base_filter_collection import BaseFilterWrapperCollection
from web_dashboard_api.base_architecture_components.filter.base_filter_wrapper import QueryFilterWrapper
from web_dashboard_api.base_architecture_components.filter.filter_available_implementation import \
    CategoryFilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_filter_parser import QueryFilterParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import \
    CategoryQueryFilterValidator
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_parser import \
    PortfolioDerivedModelParser

#TODO: fix this one
class PortfolioFilterWrapperCollection(BaseFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, filter_wrappers, **kwargs):
        # IMPORTANT: Fields have to conform to django models field names (not including foreign table prefixes)
        # Years Filter
        if "portfolio_names" in kwargs:
            portfolio_names = kwargs["portfolio_names"]
        else:
            portfolio_names = self.get_on_distinct_attribute('portfolio__name', 'name', PortfolioDerivedModelParser)
        filter_wrappers.append(
            QueryFilterWrapper(
                CategoryFilterAvailable(field="name", label="Portfolio Name", required=False,
                                             options=portfolio_names, foreign_table="portfolio"),
                CategoryQueryFilterValidator,
                QueryFilterParser
            )
        )
        super().__init__(filter_wrappers)
