from web_dashboard_api.base_architecture_components.operators.base_operator_value_parser import RangeOperatorValueParser
from web_dashboard_api.base_architecture_components.operators.base_operator_value_validators import RangeOperatorValueValidator
from web_dashboard_api.base_architecture_components.operators.base_operator import BaseOperator
from web_dashboard_api.base_architecture_components.filterenums import Operator


class BaseDerivedOperator(BaseOperator):
    def __init__(self, operator: Operator, **kwargs):
        super().__init__(operator, **kwargs)
        
    def passes_filter(self, obj, field, value):
        try:
            getattr(obj, field)
            # Handles attribute is None
            if getattr(obj, field) is None:
                return False
            else:
                return True
        except AttributeError as e:
            return False


class EqualsDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.eq, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) == value
        return False


class NotEqualsDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.neq, **kwargs)
        
    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) != value
        return False


class GtDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.gt, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) > value
        return False


class GteDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.gte, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) >= value
        return False


class LtDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.lt, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) < value
        return False


class LteDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.lte, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return getattr(obj, field) <= value
        return False


class ContainsDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.contains, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return value in getattr(obj, field)
        return False


class DoesNotContainDerivedOperator(BaseDerivedOperator):
    def __init__(self, **kwargs):
        super().__init__(Operator.doesnotcontain, **kwargs)

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return not (value in getattr(obj, field))
        return False


class RangeDerivedOperator(BaseDerivedOperator, RangeOperatorValueValidator, RangeOperatorValueParser):
    def __init__(self, **kwargs):
        super().__init__(
            Operator.range,
            operator_value_validator=RangeOperatorValueValidator(),
            operator_value_parser=RangeOperatorValueParser(),
            **kwargs
        )

    def passes_filter(self, obj, field, value):
        if super().passes_filter(obj, field, value):
            return value[1] >= getattr(obj, field) >= value[0]
        return False
