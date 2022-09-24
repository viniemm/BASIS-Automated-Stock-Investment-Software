from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BaseEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_parser import \
    DateGranularityParser, IntegerGranularityParser, CategoryGranularityParser, BaseGranularityParser
from web_dashboard_api.base_architecture_components.post_processing.breakdown_processor import BaseBreakdownProcessor, \
    CategoryBreakdownProcessor, IntegerBreakdownProcessor, DateBreakdownProcessor, NoBreakdownProcessor
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_validator import \
    BaseBreakdownEndpointPropertyValidator


class BaseBreakdownEndpointPropertyParser:
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseBreakdownEndpointPropertyValidator,
                 **kwargs):
        self.endpoint_property_available = endpoint_property_available
        self.endpoint_property_validator = endpoint_property_validator
        self.granularity_parser = BaseGranularityParser()
        if 'granularity_parser' in kwargs:
            self.granularity_parser = kwargs['granularity_parser']

    def parse_granularity(self, granularity):
        return self.granularity_parser.parse_granularity(granularity)

    def get_breakdown_processor(self, breakdown_attribute: str, granularity) -> BaseBreakdownProcessor:
        pass

    # Assumes it is already validated
    def parse_property(self, json_property) -> BaseBreakdownProcessor:
        return self.get_breakdown_processor(breakdown_attribute=json_property["attribute"],
                                            granularity=self.parse_granularity(json_property["granularity"]))


class CategoryBreakdownEndpointPropertyParser(BaseBreakdownEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseBreakdownEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=CategoryGranularityParser(),
                         **kwargs)

    def get_breakdown_processor(self, breakdown_attribute: str, granularity) -> CategoryBreakdownProcessor:
        return CategoryBreakdownProcessor(breakdown_attribute)


class IntegerBreakdownEndpointPropertyParser(BaseBreakdownEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseBreakdownEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=IntegerGranularityParser(),
                         **kwargs)

    def get_breakdown_processor(self, breakdown_attribute: str, granularity) -> IntegerBreakdownProcessor:
        return IntegerBreakdownProcessor(breakdown_attribute, granularity)


class DateBreakdownEndpointPropertyParser(BaseBreakdownEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseBreakdownEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=DateGranularityParser(),
                         **kwargs)

    def get_breakdown_processor(self, breakdown_attribute: str, granularity) -> DateBreakdownProcessor:
        return DateBreakdownProcessor(breakdown_attribute, granularity)
