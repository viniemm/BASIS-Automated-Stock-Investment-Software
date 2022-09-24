import typing

from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    XAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.x_axis_processor import BaseXAxisProcessor
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_parser import \
    BaseXAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_validator import \
    BaseXAxisEndpointPropertyValidator
from web_dashboard_api.exceptions.custom_exceptions import ParsingException, BadRequestException


class XAxisPropertyProcessorProvider:
    def __init__(self, x_axis_property_available: XAxisEndpointPropertyAvailable,
                 x_axis_property_validator_class: typing.Type[BaseXAxisEndpointPropertyValidator],
                 x_axis_property_parser_class: typing.Type[BaseXAxisEndpointPropertyParser]
                 ):
        self.x_axis_property_available = x_axis_property_available
        self.x_axis_property_validator = x_axis_property_validator_class(self.x_axis_property_available)
        self.x_axis_property_parser = x_axis_property_parser_class(self.x_axis_property_available, self.x_axis_property_validator)

    def get_property_processor_from_json(self, json_property) -> BaseXAxisProcessor:
        if not ("attribute" in json_property and "granularity" in json_property):
            raise BadRequestException("XAxis property was not formatted properly.")
        if self.x_axis_property_validator.validate_endpoint_property_json(json_property):
            x_axis_property = self.x_axis_property_parser.parse_property(json_property)
            x_axis_property.attribute_label = self.x_axis_property_available.label
            return x_axis_property
        else:
            raise ParsingException("XAxis property is supported at this endpoint.")

