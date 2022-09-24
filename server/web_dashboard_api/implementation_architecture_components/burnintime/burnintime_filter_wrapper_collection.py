from web_dashboard_api.base_architecture_components.filter.base_filter_collection import BaseFilterWrapperCollection
from web_dashboard_api.base_architecture_components.filter.base_filter_wrapper import QueryFilterWrapper, \
    DerivedFilterWrapper
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_parser import DerivedFilterParser
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_validator import \
    CategoryDerivedFilterValidator
from web_dashboard_api.base_architecture_components.filter.filter_available_implementation import \
    TextFilterAvailable, PartNumberFilterAvailable, CategoryFilterAvailable
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.base_architecture_components.filter_query.query_filter_parser import QueryFilterParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_validator import TextQueryFilterValidator, \
    CategoryQueryFilterValidator
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.implementation_architecture_components.burnintime.inprogress.burnintime_inprogress_parser import \
    BurnInTimeInProgressDerivedModelParser


class BurnInTimeFilterWrapperCollection(BaseFilterWrapperCollection):
    LAST_UPDATE_TIME_DELTA = 1

    def __init__(self, filter_wrappers, **kwargs):
        # IMPORTANT: Fields have to conform to django models field names (not including foreign table prefixes)
        # Example of Text filter
        # filter_providers.append(
        #     QueryFilterProvider(
        #         TextQueryFilterAvailable(field="lamp_id", label="Lamp ID", required=False),
        #         TextQueryFilterValidator,
        #         QueryFilterParser
        #     )
        # )
        # Example of number filter
        # filter_providers.append(
        #     QueryFilterProvider(
        #         IntegerQueryFilterAvailable(field="attempt_duration", label="Attempt Duration", required=False),
        #         IntegerQueryFilterValidator,
        #         IntegerQueryFilterParser
        #     )
        # )
        # In order to filter out not needed device types. Only pass needed device types
        # Device Type as Query Filter
        # device_types = []
        # if "device_type" in kwargs:
        #     device_types = kwargs["device_type"]
        # else:
        #     complex_filter = QueryComplexFilter('and', [])
        #     burnintime_derived_model_parser = BurnInTimeDerivedModelParser(distinct_on=["lamp__device_type"])
        #     derived_models = burnintime_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
        #     for derived_model in derived_models:
        #         device_types.append(FieldValueLabel(derived_model.device_type, derived_model.device_type_label))
        # filter_providers.append(
        #     QueryFilterProvider(
        #         CategoryQueryFilterAvailable(field="device_type", label="Device Type", required=False,
        #                                      options=device_types, foreign_table="lamp"),
        #         CategoryQueryFilterValidator,
        #         QueryFilterParser
        #     )
        # )
        # Device type as derived filter
        device_types = []
        if "device_type" in kwargs:
            device_types = kwargs["device_type"]
        else:
            complex_filter = QueryComplexFilter('and', [])
            burnintime_derived_model_parser = BurnInTimeInProgressDerivedModelParser(distinct_on=["lamp__device_type"])
            derived_models = burnintime_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            for derived_model in derived_models:
                device_types.append((derived_model.device_type_label, derived_model.device_type_label))
        # Make sure no duplicates
        device_types = set(device_types)
        device_types_list = []
        for value, label in device_types:
            device_types_list.append(FieldValueLabel(value, label))
        filter_wrappers.append(
            DerivedFilterWrapper(
                CategoryFilterAvailable(field="device_type_label", label="Device Type", required=False,
                                             options=device_types_list),
                CategoryDerivedFilterValidator,
                DerivedFilterParser
            )
        )
        # In order to filter out not needed part numbers. Only pass needed part numbers
        part_numbers = []
        if "part_numbers" in kwargs:
            part_numbers = kwargs["part_numbers"]
        else:
            complex_filter = QueryComplexFilter('and', [])
            burnintime_derived_model_parser = BurnInTimeInProgressDerivedModelParser(distinct_on=["lamp__order_code"])
            derived_models = burnintime_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            for derived_model in derived_models:
                part_numbers.append(derived_model.part_number)
        filter_wrappers.append(
            QueryFilterWrapper(
                PartNumberFilterAvailable(field="order_code", label="Part Number", required=False,
                                          part_numbers=part_numbers, foreign_table="lamp"),
                CategoryQueryFilterValidator,
                QueryFilterParser
            )
        )
        # Example of number filter
        # filter_providers.append(
        #     DerivedFilterProvider(
        #         IntegerDerivedFilterAvailable(field="seconds_left", label="Seconds Left", required=False),
        #         IntegerDerivedFilterValidator,
        #         IntegerDerivedFilterParser
        #     )
        # )
        super().__init__(filter_wrappers)
