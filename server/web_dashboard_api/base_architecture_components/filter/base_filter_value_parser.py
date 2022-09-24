from dateutil import parser


class BaseFilterValueParser:
    def filter_value_parsing(self, value):
        return value


class LogicFilterValueParser(BaseFilterValueParser):
    def filter_value_parsing(self, value) -> bool:
        return bool(value)


class IntegerFilterValueParser(BaseFilterValueParser):
    def filter_value_parsing(self, value) -> int:
        return int(value)


class DateFilterValueParser(BaseFilterValueParser):
    def filter_value_parsing(self, value):
        return parser.parse(value)
