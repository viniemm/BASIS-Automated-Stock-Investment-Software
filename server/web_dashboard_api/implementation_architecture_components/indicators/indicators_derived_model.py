from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel


class IndicatorsDerivedModel(BaseDerivedModel):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.year = None
        self.symbol = None
        self.revenue = None
        self.revenue_growth = None
        self.gross_profit = None
        for key, value in kwargs.items():
            setattr(self, key, value)
        # Get filter_derived properties
        self.revenue_mil = None
        if self.revenue:
            self.revenue_mil = self.revenue / 100000
