from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BaseEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_parser import \
    BaseGranularityParser, CategoryGranularityParser, IntegerGranularityParser, DateGranularityParser, \
    FloatGranularityParser
from web_dashboard_api.base_architecture_components.post_processing.x_axis_processor import BaseXAxisProcessor, \
    CategoryXAxisProcessor, IntegerXAxisProcessor, DateXAxisProcessor, FinishesAtDateXAxisProcessor, \
    FloatXAxisProcessor, SkipNullFloatXAxisProcessor
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_validator import \
    BaseXAxisEndpointPropertyValidator


class BaseXAxisEndpointPropertyParser:
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator, **kwargs):
        self.endpoint_property_available = endpoint_property_available
        self.endpoint_property_validator = endpoint_property_validator
        if 'granularity_parser' in kwargs:
            self.granularity_parser = kwargs['granularity_parser']

    def parse_granularity(self, granularity):
        return self.granularity_parser.parse_granularity(granularity)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        pass

    # Assumes it is already validated
    def parse_property(self, json_property) -> BaseXAxisProcessor:
        return self.get_x_axis_processor(attribute=json_property["attribute"],
                                         granularity=self.parse_granularity(json_property["granularity"]))


class CategoryXAxisEndpointPropertyParser(BaseXAxisEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=CategoryGranularityParser(),
                         **kwargs)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return CategoryXAxisProcessor(attribute, granularity)


class IntegerXAxisEndpointPropertyParser(BaseXAxisEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=IntegerGranularityParser(),
                         **kwargs)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return IntegerXAxisProcessor(attribute, granularity)


class FloatXAxisEndpointPropertyParser(BaseXAxisEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=FloatGranularityParser(),
                         **kwargs)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return FloatXAxisProcessor(attribute, granularity)


class SkipNullFloatXAxisEndpointPropertyParser(FloatXAxisEndpointPropertyParser):
    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return SkipNullFloatXAxisProcessor(attribute, granularity)


class DateXAxisEndpointPropertyParser(BaseXAxisEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=DateGranularityParser(),
                         **kwargs)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return DateXAxisProcessor(attribute, granularity)


class FinishesAtDateXAxisEndpointPropertyParser(BaseXAxisEndpointPropertyParser):
    def __init__(self, endpoint_property_available: BaseEndpointPropertyAvailable,
                 endpoint_property_validator: BaseXAxisEndpointPropertyValidator,
                 **kwargs):
        super().__init__(endpoint_property_available,
                         endpoint_property_validator,
                         granularity_parser=DateGranularityParser(),
                         **kwargs)

    def get_x_axis_processor(self, attribute: str, granularity) -> BaseXAxisProcessor:
        return FinishesAtDateXAxisProcessor(attribute, granularity)
