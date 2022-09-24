import numbers
from datetime import datetime


class BaseFilterTypeValidator:
    def type_validation(self, value) -> bool:
        return value is not None


class LogicFilterTypeValidator(BaseFilterTypeValidator):
    def type_validation(self, value) -> bool:
        return isinstance(value, bool)


class IntegerFilterTypeValidator(BaseFilterTypeValidator):
    def type_validation(self, value) -> bool:
        return isinstance(value, numbers.Number)


class DateFilterTypeValidator(BaseFilterTypeValidator):
    def type_validation(self, value) -> bool:
        return type(value) is datetime


class TextFilterTypeValidator(BaseFilterTypeValidator):
    def type_validation(self, value):
        return isinstance(value, str)


class CategoryFilterTypeValidator(BaseFilterTypeValidator):
    def __init__(self, options):
        self.options = options

    def type_validation(self, value) -> bool:
        return value in self.options
