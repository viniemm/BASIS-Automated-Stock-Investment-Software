from web_dashboard_api.implementation_architecture_components.portfolio_historical.portfolio_filter_wrapper_collection import \
    PortfolioFilterWrapperCollection


class PortfolioHistoricalFilterWrapperCollection(PortfolioFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, **kwargs):
        filter_wrappers = []

        super().__init__(filter_wrappers, **kwargs)
