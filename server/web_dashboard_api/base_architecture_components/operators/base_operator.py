from web_dashboard_api.base_architecture_components.filter.base_filter_type_validators import BaseFilterTypeValidator
from web_dashboard_api.base_architecture_components.filter.base_filter_value_parser import BaseFilterValueParser
from web_dashboard_api.base_architecture_components.operators.base_operator_value_parser import BaseOperatorValueParser
from web_dashboard_api.base_architecture_components.operators.base_operator_value_validators import BaseOperatorValueValidator
from web_dashboard_api.base_architecture_components.filterenums import Operator


class BaseOperator:
    def __init__(
            self,
            operator: Operator,
            **kwargs
    ):
        self.operator = operator
        self.operator_value_validator = BaseOperatorValueValidator()
        self.operator_value_parser = BaseOperatorValueParser()
        if "operator_value_validator" in kwargs:
            self.operator_value_validator = kwargs["operator_value_validator"]
        if "operator_value_parser" in kwargs:
            self.operator_value_parser = kwargs["operator_value_parser"]

    def parse_value(self, value, value_parser: BaseFilterValueParser):
        return self.operator_value_parser.parse_value(value, value_parser)

    def validate_value(self, value, type_validator: BaseFilterTypeValidator):
        return self.operator_value_validator.validate_value(value, type_validator)
