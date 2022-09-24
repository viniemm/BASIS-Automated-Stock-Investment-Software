from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    XAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_validator import \
    BaseGranularityValidator, CategoryGranularityValidator, DateGranularityValidator, \
    NumberGranularityValidator


class BaseXAxisEndpointPropertyValidator(BaseGranularityValidator):
    def __init__(self, endpoint_property_available: XAxisEndpointPropertyAvailable):
        self.endpoint_property_available = endpoint_property_available

    def validate_endpoint_property_json(self, json_property) -> bool:
        return self.validate_granularity(self.endpoint_property_available, json_property["granularity"])


class CategoryXAxisEndpointPropertyValidator(BaseXAxisEndpointPropertyValidator, CategoryGranularityValidator):
    pass


class DateXAxisEndpointPropertyValidator(BaseXAxisEndpointPropertyValidator, DateGranularityValidator):
    pass


class NumberXAxisEndpointPropertyValidator(BaseXAxisEndpointPropertyValidator, NumberGranularityValidator):
    pass
