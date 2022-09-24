from web_dashboard_api.base_architecture_components.filterenums import Granularity
from web_dashboard_api.base_architecture_components.jsonserialize import JsonSerialize


class BaseEndpointPropertyAvailable(JsonSerialize):
    def __init__(self, attribute: str, label: str, granularity_available: [Granularity], **kwargs):
        self.attribute = attribute
        self.label = label
        self.granularity_available = granularity_available


class BreakdownEndpointPropertyAvailable(BaseEndpointPropertyAvailable):
    def __init__(self, attribute: str, label: str, granularity_available: [Granularity], **kwargs):
        super(BreakdownEndpointPropertyAvailable, self).__init__(attribute, label, granularity_available, **kwargs)


class XAxisEndpointPropertyAvailable(BaseEndpointPropertyAvailable):
    def __init__(self, attribute: str, label: str, granularity_available: [Granularity], **kwargs):
        super(XAxisEndpointPropertyAvailable, self).__init__(attribute, label, granularity_available, **kwargs)


class YAxisEndpointPropertyAvailable(BaseEndpointPropertyAvailable):
    def __init__(self, attribute: str, label: str, granularity_available: [Granularity], operations_available: [str], **kwargs):
        super(YAxisEndpointPropertyAvailable, self).__init__(attribute, label, granularity_available, **kwargs)
        self.operations_available = operations_available
