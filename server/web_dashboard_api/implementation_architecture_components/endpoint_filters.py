from web_dashboard_api.base_architecture_components.jsonserialize import JsonSerialize
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_endpoint_properties_provider import \
    BurnInTimeInProgressEndpointPropertiesProvider
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_filter_wrapper_collection import \
    BurnInTimeInProgressFilterWrapperCollection


class EndpointFilters(JsonSerialize):
    x_axis = []
    y_axis = []
    breakdown = []
    filters = []

    def __init__(self, **kwargs):
        for key, value in kwargs.items():
            if key == "x_axis":
                self.x_axis = value
            if key == "y_axis":
                self.y_axis = value
            if key == "breakdown":
                self.breakdown = value
            if key == "filters":
                self.filters = value


class IndicatorsReportEndpointFilters(EndpointFilters):
    def __init__(self):
        endpoint_properties_provider = BurnInTimeInProgressEndpointPropertiesProvider()
        x_axis = endpoint_properties_provider.get_x_axis_available_list()
        y_axis = endpoint_properties_provider.get_y_axis_available_list()
        breakdown = endpoint_properties_provider.get_breakdown_available_list()
        filters = BurnInTimeInProgressFilterWrapperCollection().get_filter_available_list()
        super().__init__(x_axis=x_axis, y_axis=y_axis, breakdown=breakdown, filters=filters)

