from web_dashboard_api.base_architecture_components.filter.base_filter_parser import BaseFilterParser
from web_dashboard_api.base_architecture_components.filter.base_filter_value_parser import LogicFilterValueParser, \
    IntegerFilterValueParser, DateFilterValueParser, BaseFilterValueParser
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryFilter, ForeignQueryFilter
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import QueryFilterValidator
from web_dashboard_api.base_architecture_components.filter_query.query_operator_models import BaseQueryOperator, EqualsQueryOperator, \
    NotEqualsQueryOperator, RangeQueryOperator, GenericQueryOperator


class QueryFilterParser(BaseFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: QueryFilterValidator, **kwargs):
        super().__init__(filter_available, filter_validator, **kwargs)

    def get_operator_obj(self, operator: str) -> BaseQueryOperator:
        match operator:
            case 'eq':
                return EqualsQueryOperator()
            case 'neq':
                return NotEqualsQueryOperator()
            case 'range':
                return RangeQueryOperator()
            case _:
                return GenericQueryOperator(self.operator_str_enum_parsing(operator))

    def filter_json_to_obj(self, field: str, value, operator: BaseQueryOperator):
        if self.filter_available.foreign_table == "":
            filter_unit = QueryFilter(field, value, operator)
        else:
            filter_unit = ForeignQueryFilter(field, value, self.filter_available.foreign_table, operator)
        return filter_unit


class LogicQueryFilterParser(QueryFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: QueryFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=LogicFilterValueParser())


class IntegerQueryFilterParser(QueryFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: QueryFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=IntegerFilterValueParser())


class DateQueryFilterParser(QueryFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: QueryFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=DateFilterValueParser())
