import typing

from web_dashboard_api.base_architecture_components.filter.base_filter_type_validators import LogicFilterTypeValidator, \
    BaseFilterTypeValidator, TextFilterTypeValidator, CategoryFilterTypeValidator, DateFilterTypeValidator, \
    IntegerFilterTypeValidator
from web_dashboard_api.base_architecture_components.filter.base_filter_validator import BaseFilterValidator
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable
from web_dashboard_api.base_architecture_components.filter.filter_available_implementation import \
    LogicFilterAvailable, IntegerFilterAvailable, DateFilterAvailable, TextFilterAvailable, \
    CategoryFilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_operator_models import BaseQueryOperator


class QueryFilterValidator(BaseFilterValidator):
    def __init__(self, filter_available: FilterAvailable, filter_type_validator: BaseFilterTypeValidator):
        super().__init__(filter_available, filter_type_validator)

    def get_operator_class(self) -> typing.Type[BaseQueryOperator]:
        return BaseQueryOperator


class LogicQueryFilterValidator(QueryFilterValidator):
    def __init__(self, filter_available: LogicFilterAvailable):
        super().__init__(filter_available, LogicFilterTypeValidator())


class IntegerQueryFilterValidator(QueryFilterValidator):
    def __init__(self, filter_available: IntegerFilterAvailable):
        super().__init__(filter_available, IntegerFilterTypeValidator())


class DateQueryFilterValidator(QueryFilterValidator):
    def __init__(self, filter_available: DateFilterAvailable):
        super().__init__(filter_available, DateFilterTypeValidator())


class TextQueryFilterValidator(QueryFilterValidator):
    def __init__(self, filter_available: TextFilterAvailable):
        super().__init__(filter_available, TextFilterTypeValidator())


class CategoryQueryFilterValidator(QueryFilterValidator):
    def __init__(self, filter_available: CategoryFilterAvailable):
        super().__init__(filter_available, CategoryFilterTypeValidator(filter_available.get_option_values()))

