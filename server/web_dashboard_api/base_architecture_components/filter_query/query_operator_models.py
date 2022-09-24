from django.db.models import Q

from web_dashboard_api.base_architecture_components.operators.base_operator_value_parser import RangeOperatorValueParser
from web_dashboard_api.base_architecture_components.operators.base_operator_value_validators import RangeOperatorValueValidator
from web_dashboard_api.base_architecture_components.operators.base_operator import BaseOperator
from web_dashboard_api.base_architecture_components.filterenums import Operator


class BaseQueryOperator(BaseOperator):
    def __init__(self, operator: Operator, suffix, **kwargs):
        super().__init__(operator, **kwargs)
        self.suffix = suffix

    def get_full_field(self, field):
        return field + self.suffix

    def build_query(self, field, value):
        return Q(**{self.get_full_field(field): value})


class EqualsQueryOperator(BaseQueryOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.eq, "", **kwargs)


class NotEqualsQueryOperator(BaseQueryOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.neq, "", **kwargs)

    def build_query(self, field, value):
        return ~super().build_query(field, value)


class GenericQueryOperator(BaseQueryOperator):
    def __init__(self, operator, **kwargs):
        super().__init__(operator, f"__{operator}", **kwargs)


class RangeQueryOperator(GenericQueryOperator):
    def __init__(self, **kwargs):
        super().__init__(
            Operator.range,
            operator_value_validator=RangeOperatorValueValidator(),
            operator_value_parser=RangeOperatorValueParser(),
            **kwargs
        )
