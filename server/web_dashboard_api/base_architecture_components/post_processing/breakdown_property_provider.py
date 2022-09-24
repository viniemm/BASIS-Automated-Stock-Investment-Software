import typing

from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BreakdownEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.breakdown_processor import BaseBreakdownProcessor, \
    NoBreakdownProcessor
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_parser import \
    BaseBreakdownEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_validator import \
    BaseBreakdownEndpointPropertyValidator
from web_dashboard_api.exceptions.custom_exceptions import ParsingException


class BreakdownPropertyProcessorProvider:
    def __init__(self, breakdown_available: BreakdownEndpointPropertyAvailable,
                 breakdown_validator_class: typing.Type[BaseBreakdownEndpointPropertyValidator],
                 breakdown_parser_class: typing.Type[BaseBreakdownEndpointPropertyParser]
                 ):
        self.breakdown_available = breakdown_available
        self.breakdown_validator = breakdown_validator_class(self.breakdown_available)
        self.breakdown_parser = breakdown_parser_class(self.breakdown_available, self.breakdown_validator)

    def get_property_processor_from_json(self, json_property) -> BaseBreakdownProcessor:
        if not ("attribute" in json_property and "granularity" in json_property):
            return NoBreakdownProcessor()
        if self.breakdown_validator.validate_breakdown_property_json(json_property):
            return self.breakdown_parser.parse_property(json_property)
        else:
            raise ParsingException("Breakdown property is supported at this endpoint.")

