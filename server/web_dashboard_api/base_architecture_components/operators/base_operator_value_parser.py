from web_dashboard_api.base_architecture_components.filter.base_filter_value_parser import BaseFilterValueParser


class BaseOperatorValueParser:
    def parse_value(self, value, value_parser: BaseFilterValueParser):
        return value_parser.filter_value_parsing(value)


class RangeOperatorValueParser(BaseOperatorValueParser):
    def parse_value(self, value: tuple, value_parser: BaseFilterValueParser):
        return value_parser.filter_value_parsing(value[0]), value_parser.filter_value_parsing(value[1])
