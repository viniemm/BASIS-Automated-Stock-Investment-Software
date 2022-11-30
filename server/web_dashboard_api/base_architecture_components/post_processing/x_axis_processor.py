from collections import defaultdict

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_processor import \
    IntegerGranularityProcessor, CategoryGranularityProcessor, BaseGranularityProcessor, DateGranularityProcessor, \
    FinishesAtDateGranularityProcessor, FloatGranularityProcessor


class BaseXAxisProcessor:
    def __init__(self, attribute: str, granularity, granularity_processor: BaseGranularityProcessor):
        self.attribute = attribute
        self.granularity = granularity
        self.attribute_label = None
        self.granularity_processor = granularity_processor

    def get_all_buckets(self, values, granularity):
        return self.granularity_processor.get_all_buckets(values, granularity)

    def get_granularity_bucket(self, value, granularity):
        return self.granularity_processor.get_granularity_bucket(value, granularity)

    def get_x_axis_buckets(self, breakdown_buckets: {str: [BaseDerivedModel]}) -> {str: {str: [BaseDerivedModel]}}:
        x_axis_buckets = defaultdict(dict)
        x_axis_attributes = []
        # Create buckets
        for breakdown_key, breakdown_bucket in breakdown_buckets.items():
            for derived_model in breakdown_bucket:
                x_axis_attribute = getattr(derived_model, self.attribute)
                if x_axis_attribute:
                    x_axis_attributes.append(x_axis_attribute)
        # TODO: decide whether to keep this or not
        all_buckets = self.get_all_buckets(x_axis_attributes, self.granularity)
        for bucket in all_buckets:
            x_axis_buckets[bucket] = dict()
        # Fill buckets
        for breakdown_key, breakdown_bucket in breakdown_buckets.items():
            for derived_model in breakdown_bucket:
                x_axis_attribute = getattr(derived_model, self.attribute)
                # Handles attribute is None
                if x_axis_attribute is None:
                    continue
                x_axis_bucket = self.get_granularity_bucket(x_axis_attribute, self.granularity)
                # This condition should technically never happen
                # if x_axis_bucket not in x_axis_buckets:
                #     x_axis_buckets[x_axis_bucket] = dict()
                if breakdown_key not in x_axis_buckets[x_axis_bucket]:
                    x_axis_buckets[x_axis_bucket][breakdown_key] = []
                x_axis_buckets[x_axis_bucket][breakdown_key].append(derived_model)
        # TODO: sort or not
        return x_axis_buckets


class CategoryXAxisProcessor(BaseXAxisProcessor):
    def __init__(self, attribute: str, granularity):
        super().__init__(attribute, granularity, CategoryGranularityProcessor())


class IntegerXAxisProcessor(BaseXAxisProcessor):
    def __init__(self, attribute: str, granularity):
        super().__init__(attribute, granularity, IntegerGranularityProcessor())


class FloatXAxisProcessor(BaseXAxisProcessor):
    def __init__(self, attribute: str, granularity):
        super().__init__(attribute, granularity, FloatGranularityProcessor())


class SkipNullFloatXAxisProcessor(FloatXAxisProcessor):
    def get_x_axis_buckets(self, breakdown_buckets: {str: [BaseDerivedModel]}) -> {str: {str: [BaseDerivedModel]}}:
        returned_dict = super().get_x_axis_buckets(breakdown_buckets)
        new_dict = {}
        for key, items in returned_dict.items():
            if len(items) > 0:
                new_dict[key] = items
        return dict(sorted(new_dict.items()))

class DateXAxisProcessor(BaseXAxisProcessor):
    def __init__(self, attribute: str, granularity):
        super().__init__(attribute, granularity, DateGranularityProcessor())


class FinishesAtDateXAxisProcessor(BaseXAxisProcessor):
    def __init__(self, attribute: str, granularity):
        super().__init__(attribute, granularity, FinishesAtDateGranularityProcessor())
