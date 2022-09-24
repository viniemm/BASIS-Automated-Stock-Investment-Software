from web_dashboard_api.base_architecture_components.jsonserialize import JsonSerialize


class FieldValueLabel(JsonSerialize):
    def __init__(self, field_value, label):
        self.field_value = field_value
        self.label = label
