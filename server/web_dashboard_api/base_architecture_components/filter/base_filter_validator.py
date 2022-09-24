from web_dashboard_api.base_architecture_components.filter.base_filter_available import BaseFilterAvailable
from web_dashboard_api.base_architecture_components.filter.base_filter_type_validators import BaseFilterTypeValidator
from web_dashboard_api.base_architecture_components.operators.base_operator import BaseOperator


class BaseFilterValidator:
    def __init__(self, filter_available: BaseFilterAvailable, filter_type_validator: BaseFilterTypeValidator):
        self.filter_available = filter_available
        self.filter_type_validator = filter_type_validator

    def get_operator_class(self) -> BaseOperator:
        pass

    def validate_filter_json(self, json_filter):
        if json_filter["field"] == self.filter_available.field:
            if json_filter["operator"] is not None \
                    and issubclass(json_filter["operator"].__class__, self.get_operator_class()) \
                    and json_filter["operator"].operator in self.filter_available.operators_available:
                return json_filter["operator"].validate_value(json_filter["value"], self.filter_type_validator)
        return False
