from web_dashboard_api.base_architecture_components.filterenums import Granularity


class BaseGranularityValidator:
    def validate_granularity(self, endpoint_property_available, granularity) -> bool:
        return granularity in endpoint_property_available.granularity_available


class CategoryGranularityValidator(BaseGranularityValidator):
    pass


class DateGranularityValidator(BaseGranularityValidator):
    pass


class NumberGranularityValidator(BaseGranularityValidator):
    def validate_granularity(self, endpoint_property_available, granularity) -> bool:
        if Granularity.float in endpoint_property_available.granularity_available and self.isfloat(granularity):
            return True
        if Granularity.digit in endpoint_property_available.granularity_available and self.isint(granularity):
            return True
        return False

    def isfloat(self, x):
        try:
            a = float(x)
        except (TypeError, ValueError):
            return False
        else:
            return True

    def isint(self, x):
        try:
            a = float(x)
            b = int(a)
        except (TypeError, ValueError):
            return False
        else:
            return a == b
