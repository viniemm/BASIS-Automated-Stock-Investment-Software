from web_dashboard_api.base_architecture_components.operators.base_operators_available import BaseOperatorsAvailable
from web_dashboard_api.base_architecture_components.jsonserialize import JsonSerialize


class BaseFilterAvailable(JsonSerialize, BaseOperatorsAvailable):
    def __init__(self, field: str, label: str, required: bool, field_type: str, base_operators_available: BaseOperatorsAvailable, *args, **kwargs):
        self.field = field
        self.required = required
        self.label = label
        self.field_type = field_type
        operators_available = base_operators_available.get_operators_available()
        for key, value in kwargs.items():
            if key == "operators_available":
                operators_available = value
        self.operators_available = operators_available
