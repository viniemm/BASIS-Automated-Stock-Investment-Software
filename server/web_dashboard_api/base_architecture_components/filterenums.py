from enum import Enum


class ExtendedEnum(Enum):
    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))


class Operator(str, ExtendedEnum):
    eq              = "eq"
    neq             = "neq"
    isnull          = "isnull"
    isnotnull       = "isnotnull"
    gte             = "gte"
    gt              = "gt"
    lte             = "lte"
    lt              = "lt"
    range           = "range"
    contains        = "contains"
    doesnotcontain  = "doesnotcontain"
    startswith      = "startswith"
    endswith        = "endswith"
    isempty         = "isempty"
    isnotempty      = "isnotempty"

    @staticmethod
    def from_str(text):
        if text in Operator.list():
            return getattr(Operator, text)
        return None


class Granularity(str, ExtendedEnum):
    shift = "shift"
    hour = "hour"
    half_hour = "half_hour"
    three_hour = "three_hour"
    day = "day"
    date = "date"
    digit = "digit"
    float = "float"
    category = "category"

    @staticmethod
    def from_str(text):
        if text in Granularity.list():
            return getattr(Granularity, text)
        return None


class FilterFieldType(str, ExtendedEnum):
    logic = "logic"
    number = "number"
    text = "text"
    category = "category"
    date = "date"
