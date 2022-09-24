import typing

from web_dashboard_api.base_architecture_components.filter.base_filter_available import BaseFilterAvailable
from web_dashboard_api.base_architecture_components.filter.base_filter_parser import BaseFilterParser
from web_dashboard_api.base_architecture_components.filter.base_filter_validator import BaseFilterValidator
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_parser import DerivedFilterParser
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_validator import \
    DerivedFilterValidator
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_filter_parser import QueryFilterParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import QueryFilterValidator


class BaseFilterWrapper:
    def __init__(self, filter_available: BaseFilterAvailable,
                 filter_validator_class: typing.Type[BaseFilterValidator],
                 filter_parser_class: typing.Type[BaseFilterParser]
                 ):
        self.filter_available = filter_available
        self.filter_validator = filter_validator_class(self.filter_available)
        self.filter_parser = filter_parser_class(self.filter_available, self.filter_validator)


class QueryFilterWrapper(BaseFilterWrapper):
    def __init__(self, filter_available: FilterAvailable,
                 filter_validator_class: typing.Type[QueryFilterValidator],
                 filter_parser_class: typing.Type[QueryFilterParser]
                 ):
        super().__init__(filter_available, filter_validator_class, filter_parser_class)


class DerivedFilterWrapper(BaseFilterWrapper):
    def __init__(self, filter_available: BaseFilterAvailable,
                 filter_validator_class: typing.Type[DerivedFilterValidator],
                 filter_parser_class: typing.Type[DerivedFilterParser]
                 ):
        super().__init__(filter_available, filter_validator_class, filter_parser_class)
