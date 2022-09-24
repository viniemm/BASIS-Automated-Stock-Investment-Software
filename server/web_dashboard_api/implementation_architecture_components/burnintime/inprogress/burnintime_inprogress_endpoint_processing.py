from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_processing import \
    BaseEndpointProcessing
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_endpoint_properties_provider import \
    BurnInTimeInProgressEndpointPropertiesProvider
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_provider import BurnInTimeInProgressDerivedModelProvider


class BurnInTimeInProgressEndpointProcessing(BaseEndpointProcessing):
    def __init__(self, filters_dict):
        super().__init__(BurnInTimeInProgressEndpointPropertiesProvider(), BurnInTimeInProgressDerivedModelProvider(), filters_dict)
