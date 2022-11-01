from web_dashboard_api.base_architecture_components.filterenums import Granularity
from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_properties_provider import \
    BaseEndpointPropertiesProvider
from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BreakdownEndpointPropertyAvailable, XAxisEndpointPropertyAvailable, YAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_parser import \
    CategoryBreakdownEndpointPropertyParser, IntegerBreakdownEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_provider import \
    BreakdownPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_validator import \
    CategoryBreakdownEndpointPropertyValidator, NumberBreakdownEndpointPropertyValidator
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_parser import \
    IntegerXAxisEndpointPropertyParser, FinishesAtDateXAxisEndpointPropertyParser, FloatXAxisEndpointPropertyParser, \
    CategoryXAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_provider import \
    XAxisPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_validator import \
    NumberXAxisEndpointPropertyValidator, DateXAxisEndpointPropertyValidator, CategoryXAxisEndpointPropertyValidator
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_parser import \
    IntegerYAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_provider import \
    YAxisPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_validator import \
    BaseYAxisEndpointPropertyValidator


class PortfolioHistoricalEndpointPropertiesProvider(BaseEndpointPropertiesProvider):
    def __init__(self):
        # IMPORTANT: Attributes have to conform to filter_derived models field names
        breakdown_property_providers = []
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("name", "Portfolio Name", [Granularity.category]),
            CategoryBreakdownEndpointPropertyValidator,
            CategoryBreakdownEndpointPropertyParser
        ))

        x_axis_property_providers = []
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("name", "Portfolio Name", [Granularity.category]),
            CategoryXAxisEndpointPropertyValidator,
            CategoryXAxisEndpointPropertyParser
        ))

        y_axis_property_providers = []
        y_axis_property_providers.append(YAxisPropertyProcessorProvider(
            YAxisEndpointPropertyAvailable("count", "Count", [Granularity.digit], ["count"]),
            BaseYAxisEndpointPropertyValidator,
            IntegerYAxisEndpointPropertyParser
        ))

        super().__init__(breakdown_property_providers, x_axis_property_providers, y_axis_property_providers)
