import typing
from datetime import timedelta, datetime

import pytz
from django.db.models import QuerySet

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_parser import \
    BaseDerivedModelParser
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_derived_model import \
    BurnInTimeDerivedModel
from web_dashboard_api.implementation_architecture_components.partnumber.partnumber_parser import \
    PartNumberDerivedModelParser
from web_dashboard_api.models import Burnintime


class BurnInTimeDerivedModelParser(BaseDerivedModelParser):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)

    def complex_filter_to_query(self, complex_filter: QueryComplexFilter):
        return super().complex_filter_to_query(complex_filter)

    def apply_complex_filter(self, complex_filter: QueryComplexFilter) -> QuerySet:
        filtered = Burnintime.objects.complex_filter(self.complex_filter_to_query(complex_filter))
        # Adding time filter
        date_from = datetime.now(pytz.timezone('America/Chicago')) - timedelta(hours=24)
        date_from = date_from.replace(tzinfo=pytz.utc)
        filtered = filtered.filter(last_update__gte=date_from)
        return filtered

    def get_derived_model_class(self) -> typing.Type[BurnInTimeDerivedModel]:
        return BurnInTimeDerivedModel

    def get_queryset_value_list(self) -> [str]:
        values_list = []
        values_list.append("lamp__lamp_id")
        values_list.append("lamp__device_type")
        values_list.append("lamp__order_code")
        values_list.append("initial_start")
        values_list.append("attempt_duration")
        values_list.append("attempt")
        values_list.append("attempt_start")
        values_list.append("current_seconds")
        return values_list

    def get_derived_model_field_list(self) -> [str]:
        values_list = []
        values_list.append("lamp_id")
        values_list.append("device_type")
        values_list.append("part_number")
        values_list.append("initial_start")
        values_list.append("attempt_duration")
        values_list.append("attempt_number")
        values_list.append("attempt_start")
        values_list.append("current_seconds")
        return values_list

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [BurnInTimeDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        # Add additional properties here and filter out stuff based on derived models in get_derived_model_list_from_filters in Provider
        # Getting Additional derived model properties
        part_numbers = set()
        for derived_model in derived_models:
            part_numbers.add(derived_model.part_number)
        part_number_labels = PartNumberDerivedModelParser().get_part_number_labels_dict(part_numbers)
        for derived_model in derived_models:
            if derived_model.part_number in part_number_labels:
                derived_model.part_number_label = part_number_labels[derived_model.part_number]
            else:
                derived_model.part_number_label = derived_model.part_number
        return derived_models
