from web_dashboard_api.base_architecture_components.filter.base_filter_type_validators import BaseFilterTypeValidator


class BaseOperatorValueValidator:
    @staticmethod
    def validate_value(value, type_validator: BaseFilterTypeValidator):
        return value is not None and type_validator.type_validation(value)


class RangeOperatorValueValidator(BaseOperatorValueValidator):
    @staticmethod
    def validate_value(value, type_validator: BaseFilterTypeValidator):
        if isinstance(value, tuple) and len(value) == 2:
            return type_validator.type_validation(value[0]) and type_validator.type_validation(value[1])
        return False
