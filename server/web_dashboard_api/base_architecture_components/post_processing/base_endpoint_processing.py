from typing import Dict, List

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_provider import \
    BaseDerivedModelProvider
from web_dashboard_api.base_architecture_components.post_processing.base_endpoint_properties_provider import \
    BaseEndpointPropertiesProvider
from web_dashboard_api.exceptions.custom_exceptions import ParsingException


class BaseEndpointProcessing:
    def __init__(self, endpoint_properties_provider: BaseEndpointPropertiesProvider, derived_model_provider: BaseDerivedModelProvider, filters_dict):
        # Parsing endpoint properties
        if not ("complex_filter" in filters_dict):
            filters_dict["complex_filter"] = {}
        if not ("breakdown" in filters_dict and "x_axis" in filters_dict and "y_axis" in filters_dict):
            raise ParsingException("One or more of endpoint properties are not formatted properly.")
        if "attribute" not in filters_dict["breakdown"] or "attribute" not in filters_dict["x_axis"] or "attribute" not in filters_dict["y_axis"]:
            raise ParsingException("One or more of endpoint properties are not formatted properly.")
        self.endpoint_properties_provider = endpoint_properties_provider
        self.derived_model_provider = derived_model_provider
        self.filters_dict = filters_dict

        # Breakdown parsing
        breakdown_processor_provider = endpoint_properties_provider.get_breakdown_processor_provider(
            filters_dict["breakdown"]["attribute"])
        self.breakdown_processor = breakdown_processor_provider.get_property_processor_from_json(filters_dict['breakdown'])
        # XAxis parsing
        x_axis_processor_provider = endpoint_properties_provider.get_x_axis_processor_provider(
            filters_dict["x_axis"]["attribute"])
        self.x_axis_processor = x_axis_processor_provider.get_property_processor_from_json(filters_dict['x_axis'])
        # YAxis parsing
        y_axis_processor_provider = endpoint_properties_provider.get_y_axis_processor_provider(
            filters_dict["y_axis"]["attribute"])
        self.y_axis_processor = y_axis_processor_provider.get_property_processor_from_json(filters_dict['y_axis'])

    def bucket_derived_models(self, derived_models) -> (List[Dict], List[str]):
        # Creating buckets
        breakdown_buckets = self.breakdown_processor.get_breakdown_buckets(derived_models)
        data_keys = breakdown_buckets.keys()
        # Creating XAxis buckets
        x_axis_buckets = self.x_axis_processor.get_x_axis_buckets(breakdown_buckets)
        # y_axis_processing. This one does count
        x_axis_buckets = self.y_axis_processor.get_y_axis_return(x_axis_buckets)

        # Including x_axis_bucket into the data_points
        for x_axis_bucket, breakdown_buckets in x_axis_buckets.items():
            x_axis_buckets[x_axis_bucket][self.x_axis_processor.attribute] = x_axis_bucket

        # Sorting of list of dicts
        data_points = list(x_axis_buckets.values())
        return data_points, data_keys

    def models_dict_to_return_type(self, data_points, data_keys) -> Dict[str, object]:
        return_dict = {
            "x_axis": {
                "attribute": self.x_axis_processor.attribute,
                "label": self.x_axis_processor.attribute_label
            },
            "y_axis": {
                "attribute": self.y_axis_processor.attribute,
                "label": self.y_axis_processor.attribute_label
            },
            "data_keys": list(data_keys),
            "details": {
            },
            "data_points": data_points
        }
        return return_dict

    def get_endpoint_return(self, user):
        complex_filters = self.filters_dict["complex_filter"]
        self.derived_model_provider.derived_model_parser.user = user
        derived_models = self.derived_model_provider.get_derived_model_list_from_json_filters(complex_filters)
        data_points, data_keys = self.bucket_derived_models(derived_models)
        return self.models_dict_to_return_type(data_points, data_keys)
