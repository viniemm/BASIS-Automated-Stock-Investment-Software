from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_filter_wrapper_collection import \
    BurnInTimeFilterWrapperCollection


class BurnInTimeInProgressFilterWrapperCollection(BurnInTimeFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, **kwargs):
        filter_wrappers = []

        super().__init__(filter_wrappers, **kwargs)
