from web_dashboard_api.base_architecture_components.filter.base_filter_available import BaseFilterAvailable
from web_dashboard_api.base_architecture_components.operators.base_operators_available import BaseOperatorsAvailable


class FilterAvailable(BaseFilterAvailable):
    def __init__(self, field: str, label: str, required: bool, field_type: str, base_operators_available: BaseOperatorsAvailable, *args, **kwargs):
        super().__init__(field, label, required, field_type, base_operators_available, *args, **kwargs)
        foreign_table = ""
        for key, value in kwargs.items():
            if key == "foreign_table":
                foreign_table = value
        self.foreign_table = foreign_table

