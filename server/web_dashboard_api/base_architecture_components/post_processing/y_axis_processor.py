from collections import defaultdict
from numbers import Number

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from web_dashboard_api.base_architecture_components.post_processing.base_granularity_processor import \
    BaseGranularityProcessor


class BaseYAxisProcessor:
    def __init__(self, attribute: str, granularity, granularity_processor: BaseGranularityProcessor):
        self.attribute = attribute
        self.attribute_label = None
        self.granularity = granularity
        self.granularity_processor = granularity_processor

    def get_summary(self, derived_models: [BaseDerivedModel]) -> Number:
        pass

    def get_y_axis_return(self, x_axis_buckets: {str: {str: [BaseDerivedModel]}}) -> {str: {str: Number}}:
        for x_axis_bucket, breakdown_buckets in x_axis_buckets.items():
            for breakdown_key, breakdown_bucket in breakdown_buckets.items():
                summary = self.get_summary(x_axis_buckets[x_axis_bucket][breakdown_key])
                summary = self.granularity_processor.get_granularity_bucket(summary, self.granularity)
                x_axis_buckets[x_axis_bucket][breakdown_key] = summary
        return x_axis_buckets


class CountYAxisProcessor(BaseYAxisProcessor):
    def get_summary(self, derived_models: [BaseDerivedModel]) -> Number:
        return len(derived_models)


class AverageYAxisProcessor(BaseYAxisProcessor):
    def get_summary(self, derived_models: [BaseDerivedModel]) -> Number:
        sum = 0
        for derived_model in derived_models:
            sum += getattr(derived_model, self.attribute)
        return sum / len(derived_models)


class ProportionYAxisProcessor(BaseYAxisProcessor):
    def __init__(self, attribute: str, granularity, granularity_processor: BaseGranularityProcessor):
        super(ProportionYAxisProcessor, self).__init__(attribute, granularity, granularity_processor)

    def get_summary(self, derived_models: [BaseDerivedModel]) -> int:
        return len(derived_models)

    def get_y_axis_return(self, x_axis_buckets: {str: {str: [BaseDerivedModel]}}) -> {str: {str: Number}}:
        bucket_count = defaultdict(int)
        for x_axis_bucket, breakdown_buckets in x_axis_buckets.items():
            for breakdown_key, breakdown_bucket in breakdown_buckets.items():
                bucket_count[x_axis_bucket] += len(breakdown_bucket)

        for x_axis_bucket, breakdown_buckets in x_axis_buckets.items():
            for breakdown_key, breakdown_bucket in breakdown_buckets.items():
                summary = self.get_summary(breakdown_bucket) / bucket_count[x_axis_bucket] * 100
                summary = self.granularity_processor.get_granularity_bucket(summary, self.granularity)
                x_axis_buckets[x_axis_bucket][breakdown_key] = summary
        return x_axis_buckets
