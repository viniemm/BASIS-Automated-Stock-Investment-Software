from web_dashboard_api.base_architecture_components.filter.base_filter_models import BaseFilter
from web_dashboard_api.exceptions.custom_exceptions import ParsingException, BadRequestException
from web_dashboard_api.base_architecture_components.filter.base_filter_available import BaseFilterAvailable
from web_dashboard_api.base_architecture_components.filter.base_filter_validator import BaseFilterValidator
from web_dashboard_api.base_architecture_components.filter.base_filter_value_parser import BaseFilterValueParser
from web_dashboard_api.base_architecture_components.operators.base_operator import BaseOperator
from web_dashboard_api.base_architecture_components.filterenums import Operator


class BaseFilterParser:
    def __init__(self, filter_available: BaseFilterAvailable, filter_validator: BaseFilterValidator, **kwargs):
        self.filter_available = filter_available
        self.filter_validator = filter_validator
        self.filter_value_parser = BaseFilterValueParser()
        if "filter_value_parser" in kwargs:
            self.filter_value_parser = kwargs["filter_value_parser"]

    def get_operator_obj(self, operator: str) -> BaseOperator:
        pass

    def operator_str_enum_parsing(self, operator: str):
        return Operator.from_str(operator)

    def filter_json_to_obj(self, field: str, value, operator: BaseOperator) -> BaseFilter:
        pass

    def filter_value_parsing(self, value):
        return self.filter_value_parser.filter_value_parsing(value)

    def filter_parsing(self, json_filter) -> BaseFilter:
        filter_unit = None
        if not ("operator" in json_filter and "value" in json_filter and "field" in json_filter):
            raise BadRequestException("One or more of the filters were not formatted properly.")
        json_filter["operator"] = self.get_operator_obj(json_filter["operator"])
        # Value parser is inherited. See QueryFilterParser
        json_filter["value"] = json_filter["operator"].parse_value(json_filter["value"], self)
        if self.filter_validator.validate_filter_json(json_filter):
            filter_unit = self.filter_json_to_obj(json_filter["field"], json_filter["value"], json_filter["operator"])
        if filter_unit is None:
            raise ParsingException("One or more of the filters are not supported at this endpoint.")
        return filter_unit
