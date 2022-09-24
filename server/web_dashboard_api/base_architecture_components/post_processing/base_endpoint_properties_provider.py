from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    YAxisEndpointPropertyAvailable, XAxisEndpointPropertyAvailable, BreakdownEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_provider import \
    BreakdownPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_provider import \
    XAxisPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_provider import \
    YAxisPropertyProcessorProvider
from web_dashboard_api.exceptions.custom_exceptions import ParsingException


class BaseEndpointPropertiesProvider:
    def __init__(self,
                 breakdown_property_providers: [BreakdownPropertyProcessorProvider],
                 x_axis_property_providers: [XAxisPropertyProcessorProvider],
                 y_axis_property_providers: [YAxisPropertyProcessorProvider]
                 ):
        self.breakdown_property_providers = breakdown_property_providers
        self.x_axis_property_providers = x_axis_property_providers
        self.y_axis_property_providers = y_axis_property_providers

    def get_breakdown_processor_provider(self, attribute: str) -> BreakdownPropertyProcessorProvider:
        provider = None
        for property_provider in self.breakdown_property_providers:
            if property_provider.breakdown_available.attribute == attribute:
                provider = property_provider
        if provider is None:
            raise ParsingException("One or more of endpoint properties are not supported by this endpoint.")
        return provider

    def get_x_axis_processor_provider(self, attribute: str) -> XAxisPropertyProcessorProvider:
        provider = None
        for property_provider in self.x_axis_property_providers:
            if property_provider.x_axis_property_available.attribute == attribute:
                provider = property_provider
        if provider is None:
            raise ParsingException("One or more of endpoint properties are not supported by this endpoint.")
        return provider

    def get_y_axis_processor_provider(self, attribute: str) -> YAxisPropertyProcessorProvider:
        provider = None
        for property_provider in self.y_axis_property_providers:
            if property_provider.y_axis_property_available.attribute == attribute:
                provider = property_provider
        if provider is None:
            raise ParsingException("One or more of endpoint properties are not supported by this endpoint.")
        return provider

    def get_breakdown_available_list(self) -> [BreakdownEndpointPropertyAvailable]:
        property_available = []
        for property_provider in self.breakdown_property_providers:
            property_available.append(property_provider.breakdown_available)
        return property_available

    def get_x_axis_available_list(self) -> [XAxisEndpointPropertyAvailable]:
        property_available = []
        for property_provider in self.x_axis_property_providers:
            property_available.append(property_provider.x_axis_property_available)
        return property_available

    def get_y_axis_available_list(self) -> [YAxisEndpointPropertyAvailable]:
        property_available = []
        for property_provider in self.y_axis_property_providers:
            property_available.append(property_provider.y_axis_property_available)
        return property_available
