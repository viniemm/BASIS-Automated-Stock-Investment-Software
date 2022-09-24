from web_dashboard_api.base_architecture_components.filter.base_filter_parser import BaseFilterParser
from web_dashboard_api.base_architecture_components.filter.base_filter_value_parser import LogicFilterValueParser, \
    IntegerFilterValueParser, DateFilterValueParser, BaseFilterValueParser
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_models import DerivedFilter
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_validator import \
    DerivedFilterValidator
from web_dashboard_api.base_architecture_components.filter_derived.derived_operator_models import EqualsDerivedOperator, \
    NotEqualsDerivedOperator, RangeDerivedOperator, GtDerivedOperator, GteDerivedOperator, LtDerivedOperator, \
    LteDerivedOperator, BaseDerivedOperator, ContainsDerivedOperator
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable


class DerivedFilterParser(BaseFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: DerivedFilterValidator, **kwargs):
        super().__init__(filter_available, filter_validator, **kwargs)

    def get_operator_obj(self, operator: str) -> BaseDerivedOperator:
        operator_object = None
        match operator:
            case 'eq':
                return EqualsDerivedOperator()
            case 'neq':
                return NotEqualsDerivedOperator()
            case 'gt':
                return GtDerivedOperator()
            case 'gte':
                return GteDerivedOperator()
            case 'lt':
                return LtDerivedOperator()
            case 'lte':
                return LteDerivedOperator()
            case 'range':
                return RangeDerivedOperator()
        return operator_object

    def filter_json_to_obj(self, field: str, value, operator: BaseDerivedOperator):
        return DerivedFilter(field, value, operator)


class LogicDerivedFilterParser(DerivedFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: DerivedFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=LogicFilterValueParser())


class IntegerDerivedFilterParser(DerivedFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: DerivedFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=IntegerFilterValueParser())


class DateDerivedFilterParser(DerivedFilterParser):
    def __init__(self, filter_available: FilterAvailable, filter_validator: DerivedFilterValidator):
        super().__init__(filter_available, filter_validator, filter_value_parser=DateFilterValueParser())


class ArrayCategoryFilterParser(DerivedFilterParser):
    def get_operator_obj(self, operator: str) -> BaseDerivedOperator:
        operator_object = super().get_operator_obj(operator)
        match operator:
            case 'eq':
                return ContainsDerivedOperator()
        return operator_object
