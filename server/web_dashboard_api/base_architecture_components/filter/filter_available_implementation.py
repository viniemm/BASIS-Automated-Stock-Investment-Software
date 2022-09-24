from web_dashboard_api.base_architecture_components.filterenums import FilterFieldType
from web_dashboard_api.base_architecture_components.operators.base_operators_available import LogicOperatorsAvailable, \
    IntegerOperatorsAvailable, DateOperatorsAvailable, TextOperatorsAvailable, CategoryOperatorsAvailable
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.base_architecture_components.filter.filter_available import FilterAvailable
from web_dashboard_api.implementation_architecture_components.partnumber.partnumber_parser import PartNumberDerivedModelParser


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


class PartNumberFilterAvailable(CategoryFilterAvailable):
    def __init__(self, field: str, label: str, required: bool, part_numbers: [str], **kwargs):
        super().__init__(field, label, required, self.get_part_number_names(part_numbers), **kwargs)

    def get_part_number_names(self, part_numbers) -> [FieldValueLabel]:
        part_number_labels_dict = PartNumberDerivedModelParser().get_part_number_labels_dict(part_numbers)
        part_number_labels = []
        for part_number, label in part_number_labels_dict.items():
            part_number_labels.append(FieldValueLabel(part_number, label))
        return part_number_labels
