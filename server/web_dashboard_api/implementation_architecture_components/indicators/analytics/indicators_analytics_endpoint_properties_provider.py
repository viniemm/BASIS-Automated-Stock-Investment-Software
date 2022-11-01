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
    IntegerXAxisEndpointPropertyParser, FinishesAtDateXAxisEndpointPropertyParser, FloatXAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_provider import \
    XAxisPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_validator import \
    NumberXAxisEndpointPropertyValidator, DateXAxisEndpointPropertyValidator
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_parser import \
    IntegerYAxisEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_provider import \
    YAxisPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.y_axis_property_validator import \
    BaseYAxisEndpointPropertyValidator


class IndicatorsAnalyticsEndpointPropertiesProvider(BaseEndpointPropertiesProvider):
    def __init__(self):
        # IMPORTANT: Attributes have to conform to filter_derived models field names
        breakdown_property_providers = []
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("year", "Year", [Granularity.category]),
            CategoryBreakdownEndpointPropertyValidator,
            CategoryBreakdownEndpointPropertyParser
        ))
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("symbol", "Symbol", [Granularity.category]),
            CategoryBreakdownEndpointPropertyValidator,
            CategoryBreakdownEndpointPropertyParser
        ))
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("revenue_bil", "Revenue Billions", [Granularity.digit]),
            NumberBreakdownEndpointPropertyValidator,
            IntegerBreakdownEndpointPropertyParser
        ))

        x_axis_property_providers = []
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("year", "Year", [Granularity.digit]),
            NumberXAxisEndpointPropertyValidator,
            IntegerXAxisEndpointPropertyParser
        ))
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("revenue_bil", "Revenue Billions", [Granularity.digit]),
            NumberXAxisEndpointPropertyValidator,
            FloatXAxisEndpointPropertyParser
        ))

        y_axis_property_providers = []
        y_axis_property_providers.append(YAxisPropertyProcessorProvider(
            YAxisEndpointPropertyAvailable("count", "Count", [Granularity.digit], ["count"]),
            BaseYAxisEndpointPropertyValidator,
            IntegerYAxisEndpointPropertyParser
        ))
        y_axis_property_providers.append(YAxisPropertyProcessorProvider(
            YAxisEndpointPropertyAvailable("revenue_bil", "Average gross profit", [Granularity.digit], ["average"]),
            BaseYAxisEndpointPropertyValidator,
            IntegerYAxisEndpointPropertyParser
        ))

        super().__init__(breakdown_property_providers, x_axis_property_providers, y_axis_property_providers)
