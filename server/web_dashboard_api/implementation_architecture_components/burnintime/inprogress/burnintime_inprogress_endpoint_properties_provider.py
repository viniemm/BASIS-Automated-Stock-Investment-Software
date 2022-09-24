from web_dashboard_api.base_architecture_components.filterenums import Granularity
from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_properties_provider import \
    BaseEndpointPropertiesProvider
from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_property_available import \
    BreakdownEndpointPropertyAvailable, XAxisEndpointPropertyAvailable, YAxisEndpointPropertyAvailable
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_parser import \
    CategoryBreakdownEndpointPropertyParser
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_provider import \
    BreakdownPropertyProcessorProvider
from web_dashboard_api.base_architecture_components.post_processing.breakdown_property_validator import \
    CategoryBreakdownEndpointPropertyValidator
from web_dashboard_api.base_architecture_components.post_processing.x_axis_property_parser import \
    IntegerXAxisEndpointPropertyParser, FinishesAtDateXAxisEndpointPropertyParser
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


class BurnInTimeInProgressEndpointPropertiesProvider(BaseEndpointPropertiesProvider):
    def __init__(self):
        # IMPORTANT: Attributes have to conform to filter_derived models field names
        breakdown_property_providers = []
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("part_number_label", "Part Number", [Granularity.category]),
            CategoryBreakdownEndpointPropertyValidator,
            CategoryBreakdownEndpointPropertyParser
        ))
        breakdown_property_providers.append(BreakdownPropertyProcessorProvider(
            BreakdownEndpointPropertyAvailable("device_type_label", "Device Type", [Granularity.category]),
            CategoryBreakdownEndpointPropertyValidator,
            CategoryBreakdownEndpointPropertyParser
        ))

        x_axis_property_providers = []
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("current_hours", "Current Hours", [Granularity.digit]),
            NumberXAxisEndpointPropertyValidator,
            IntegerXAxisEndpointPropertyParser
        ))
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("hours_left", "Hours Left", [Granularity.digit]),
            NumberXAxisEndpointPropertyValidator,
            IntegerXAxisEndpointPropertyParser
        ))
        x_axis_property_providers.append(XAxisPropertyProcessorProvider(
            XAxisEndpointPropertyAvailable("finish_at", "Finishes at", [Granularity.half_hour, Granularity.hour, Granularity.three_hour, Granularity.day, Granularity.shift]),
            DateXAxisEndpointPropertyValidator,
            FinishesAtDateXAxisEndpointPropertyParser
        ))

        y_axis_property_providers = []
        y_axis_property_providers.append(YAxisPropertyProcessorProvider(
            YAxisEndpointPropertyAvailable("count", "Count", [Granularity.digit], ["count"]),
            BaseYAxisEndpointPropertyValidator,
            IntegerYAxisEndpointPropertyParser
        ))

        super().__init__(breakdown_property_providers, x_axis_property_providers, y_axis_property_providers)
