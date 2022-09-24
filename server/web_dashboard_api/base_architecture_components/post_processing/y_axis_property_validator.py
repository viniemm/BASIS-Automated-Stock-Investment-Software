from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    YAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_validator import \
    BaseGranularityValidator


class BaseYAxisEndpointPropertyValidator:
    def __init__(self, endpoint_property_available: YAxisEndpointPropertyAvailable, granularity_validator: BaseGranularityValidator):
        self.endpoint_property_available = endpoint_property_available
        self.granularity_validator = granularity_validator

    def validate_operation(self, operation):
        return operation in self.endpoint_property_available.operations_available

    def validate_breakdown_property_json(self, json_property) -> bool:
        granularity_valid = self.granularity_validator.validate_granularity(self.endpoint_property_available, json_property["granularity"])
        operation_valid = self.validate_operation(json_property["operation"])
        return granularity_valid and operation_valid
