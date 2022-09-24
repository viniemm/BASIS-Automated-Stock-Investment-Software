import typing

from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    YAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_validator import \
    NumberGranularityValidator
from web_dashboard_api.base_architecture_components.post_processing.y_axis_processor import BaseYAxisProcessor
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_parser import \
    BaseYAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_validator import \
    BaseYAxisEndpointPropertyValidator
from web_dashboard_api.exceptions.custom_exceptions import BadRequestException, ParsingException


class YAxisPropertyProcessorProvider:
    def __init__(self, y_axis_property_available: YAxisEndpointPropertyAvailable,
                 y_axis_property_validator_class: typing.Type[BaseYAxisEndpointPropertyValidator],
                 y_axis_property_parser_class: typing.Type[BaseYAxisEndpointPropertyParser]
                 ):
        self.y_axis_property_available = y_axis_property_available
        self.y_axis_property_validator = y_axis_property_validator_class(self.y_axis_property_available, NumberGranularityValidator())
        self.y_axis_property_parser = y_axis_property_parser_class(self.y_axis_property_available, self.y_axis_property_validator)

    def get_property_processor_from_json(self, json_property) -> BaseYAxisProcessor:
        if not ("attribute" in json_property and "granularity" in json_property and "operation" in json_property):
            raise BadRequestException("YAxis property was not formatted properly.")
        if self.y_axis_property_validator.validate_breakdown_property_json(json_property):
            y_axis_property = self.y_axis_property_parser.parse_property(json_property)
            y_axis_property.attribute_label = self.y_axis_property_available.label
            return y_axis_property
        else:
            raise ParsingException("YAxis property is supported at this endpoint.")