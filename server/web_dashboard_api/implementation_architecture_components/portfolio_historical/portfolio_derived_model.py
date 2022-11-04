from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from datetime import datetime


class PortfolioDerivedModel(BaseDerivedModel):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.portfolio_name = None
        self.symbol = None
        self.allocation = None
        self.industry = None
        self.initial_value = None
        self.date = None
        self.close = None
        self.volume = None
        self.closing_proportional = None
        self.industry_type = None
        for key, value in kwargs.items():
            setattr(self, key, value)
        # Get filter_derived properties
        if self.allocation is not None and self.close is not None:
            self.closing_proportional = self.allocation * self.close
        if self.date:
            self.date = datetime.strptime(self.date, '%Y-%m-%d')
