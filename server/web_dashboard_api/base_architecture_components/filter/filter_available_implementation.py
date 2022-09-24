from web_dashboard_api.base_architecture_components.filterenums import FilterFieldType
from web_dashboard_api.base_architecture_components.operators.base_operators_available import LogicOperatorsAvailable, \
    IntegerOperatorsAvailable, DateOperatorsAvailable, TextOperatorsAvailable, CategoryOperatorsAvailable
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable


class LogicFilterAvailable(FilterAvailable):
    def __init__(self, field: str, label: str, required: bool, *args, **kwargs):
        super().__init__(field, label, required, FilterFieldType.logic, LogicOperatorsAvailable(), *args, **kwargs)


class IntegerFilterAvailable(FilterAvailable):
    def __init__(self, field: str, label: str, required: bool, **kwargs):
        super().__init__(field, label, required, FilterFieldType.number, IntegerOperatorsAvailable(), **kwargs)


class DateFilterAvailable(FilterAvailable):
    def __init__(self, field: str, label: str, required: bool, **kwargs):
        super().__init__(field, label, required, FilterFieldType.date, DateOperatorsAvailable(), **kwargs)


class TextFilterAvailable(FilterAvailable):
    def __init__(self, field: str, label: str, required: bool, **kwargs):
        super().__init__(field, label, required, FilterFieldType.text, TextOperatorsAvailable(), **kwargs)


class CategoryFilterAvailable(FilterAvailable):
    def __init__(self, field: str, label: str, required: bool, options: [FieldValueLabel], **kwargs):
        super().__init__(field, label, required, FilterFieldType.category, CategoryOperatorsAvailable(), **kwargs)
        self.options = options

    def get_option_values(self):
        value_list = list()
        for option in self.options:
            value_list.append(option.field_value)
        return value_list

    def get_option_dict(self):
        option_dict = dict()
        for option in self.options:
            option_dict[option.field_value] = option.label
        return option_dict
