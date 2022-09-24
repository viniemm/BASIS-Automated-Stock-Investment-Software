from web_dashboard_api.base_architecture_components.operators.base_operator import BaseOperator


class BaseFilter:
    def __init__(self, field: str, value, operator: BaseOperator):
        self.field = field
        self.value = value
        self.operator = operator


class BaseComplexFilter:
    def __init__(self, logic: str, filters):
        self.logic = logic
        self.filters = filters
