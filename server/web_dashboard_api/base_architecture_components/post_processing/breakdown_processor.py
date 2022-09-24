from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_processor import \
    BaseGranularityProcessor, CategoryGranularityProcessor, IntegerGranularityProcessor, DateGranularityProcessor


class BaseBreakdownProcessor:
    def __init__(self, breakdown_attribute: str, granularity_processor: BaseGranularityProcessor):
        self.breakdown_attribute = breakdown_attribute
        self.granularity_processor = granularity_processor

    def get_all_buckets(self, values, granularity):
        return self.granularity_processor.get_all_buckets(values, granularity)

    def get_granularity_bucket(self, value, granularity):
        return self.granularity_processor.get_granularity_bucket(value, granularity)

    def get_breakdown_buckets(self, derived_models: [BaseDerivedModel]) -> [BaseDerivedModel]:
        breakdown_buckets = {}
        for derived_model in derived_models:
            breakdown_key = self.get_breakdown_key(derived_model)
            # Handles attribute is None
            if breakdown_key is None:
                continue
            if breakdown_key not in breakdown_buckets:
                breakdown_buckets[breakdown_key] = []
            breakdown_buckets[breakdown_key].append(derived_model)
        return breakdown_buckets

    def get_breakdown_key(self, derived_model: BaseDerivedModel) -> str:
        # Handles attribute is None
        if getattr(derived_model, self.breakdown_attribute) is None:
            return None


class NoBreakdownProcessor(BaseBreakdownProcessor):
    def __init__(self):
        super().__init__("x", BaseGranularityProcessor())

    def get_breakdown_key(self, derived_model: BaseDerivedModel) -> str:
        super().get_breakdown_key(derived_model)
        return self.breakdown_attribute


class CategoryBreakdownProcessor(BaseBreakdownProcessor):
    def __init__(self, breakdown_attribute: str):
        super().__init__(breakdown_attribute, CategoryGranularityProcessor())

    def get_breakdown_key(self, derived_model: BaseDerivedModel) -> str:
        super().get_breakdown_key(derived_model)
        return self.get_granularity_bucket(getattr(derived_model, self.breakdown_attribute), "")


class IntegerBreakdownProcessor(BaseBreakdownProcessor):
    def __init__(self, breakdown_attribute: str, granularity: int):
        super().__init__(breakdown_attribute, IntegerGranularityProcessor())
        self.granularity = granularity

    def get_breakdown_key(self, derived_model: BaseDerivedModel) -> str:
        super().get_breakdown_key(derived_model)
        return self.get_granularity_bucket(getattr(derived_model, self.breakdown_attribute), self.granularity)


class DateBreakdownProcessor(BaseBreakdownProcessor):
    def __init__(self, breakdown_attribute: str, granularity: str):
        super().__init__(breakdown_attribute, DateGranularityProcessor())
        self.granularity = granularity

    def get_breakdown_key(self, derived_model: BaseDerivedModel) -> str:
        super().get_breakdown_key(derived_model)
        return self.get_granularity_bucket(getattr(derived_model, self.breakdown_attribute), self.granularity)
