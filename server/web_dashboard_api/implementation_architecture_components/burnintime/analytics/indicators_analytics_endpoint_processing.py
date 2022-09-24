from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_processing import \
    BaseEndpointProcessing
from web_dashboard_api.implementation_architecture_components.burnintime.analytics.indicators_analytics_endpoint_properties_provider import \
    IndicatorsAnalyticsEndpointPropertiesProvider
from web_dashboard_api.implementation_architecture_components.burnintime.analytics.indicators_analytics_provider import IndicatorsAnalyticsDerivedModelProvider


class IndicatorsAnalyticsEndpointProcessing(BaseEndpointProcessing):
    def __init__(self, filters_dict):
        super().__init__(IndicatorsAnalyticsEndpointPropertiesProvider(), IndicatorsAnalyticsDerivedModelProvider(), filters_dict)
