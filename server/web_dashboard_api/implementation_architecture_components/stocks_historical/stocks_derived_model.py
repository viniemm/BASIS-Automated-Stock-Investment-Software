from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel


class StocksDerivedModel(BaseDerivedModel):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.date = None
        self.symbol = None
        self.close = None
        self.volume = None
        for key, value in kwargs.items():
            setattr(self, key, value)
        # Get filter_derived properties
        self.industry_type = None
