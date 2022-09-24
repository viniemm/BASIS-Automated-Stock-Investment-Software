from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BreakdownEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_validator import \
    BaseGranularityValidator, CategoryGranularityValidator, DateGranularityValidator, \
    NumberGranularityValidator


class BaseBreakdownEndpointPropertyValidator(BaseGranularityValidator):
    def __init__(self, endpoint_property_available: BreakdownEndpointPropertyAvailable):
        self.endpoint_property_available = endpoint_property_available

    def validate_breakdown_property_json(self, json_property) -> bool:
        return self.validate_granularity(self.endpoint_property_available, json_property["granularity"])


class CategoryBreakdownEndpointPropertyValidator(BaseBreakdownEndpointPropertyValidator, CategoryGranularityValidator):
    pass


class DateBreakdownEndpointPropertyValidator(BaseBreakdownEndpointPropertyValidator, DateGranularityValidator):
    pass


class NumberBreakdownEndpointPropertyValidator(BaseBreakdownEndpointPropertyValidator, NumberGranularityValidator):
    pass
