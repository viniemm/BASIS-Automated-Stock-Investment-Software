from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    YAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_parser import \
    BaseGranularityParser, IntegerGranularityParser
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_processor import \
    IntegerGranularityProcessor, FloatGranularityProcessor
from web_dashboard_api.base_architecture_components.post_processing.y_axis_processor import BaseYAxisProcessor, \
    CountYAxisProcessor, AverageYAxisProcessor, ProportionYAxisProcessor
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_validator import \
    BaseYAxisEndpointPropertyValidator


class BaseYAxisEndpointPropertyParser(BaseGranularityParser):
    def __init__(self, endpoint_property_available: YAxisEndpointPropertyAvailable,
                 endpoint_property_validator: BaseYAxisEndpointPropertyValidator):
        self.endpoint_property_available = endpoint_property_available
        self.endpoint_property_validator = endpoint_property_validator

    def get_y_axis_processor(self, attribute: str, granularity, operation: str) -> BaseYAxisProcessor:
        if operation == "count":
            return CountYAxisProcessor(attribute, granularity, IntegerGranularityProcessor())
        if operation == "average":
            return AverageYAxisProcessor(attribute, granularity, FloatGranularityProcessor())
        if operation == "proportion":
            return ProportionYAxisProcessor(attribute, granularity, IntegerGranularityProcessor())

    # Assumes it is already validated
    def parse_property(self, json_property) -> BaseYAxisProcessor:
        return self.get_y_axis_processor(attribute=json_property["attribute"],
                                         granularity=self.parse_granularity(json_property["granularity"]),
                                         operation=json_property["operation"])


class IntegerYAxisEndpointPropertyParser(BaseYAxisEndpointPropertyParser, IntegerGranularityParser):
    pass
