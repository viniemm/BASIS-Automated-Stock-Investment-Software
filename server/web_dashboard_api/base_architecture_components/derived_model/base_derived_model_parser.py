import typing
from django.db.models import QuerySet, Q
import numpy as np

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model import BaseDerivedModel
from web_dashboard_api.base_architecture_components.filter.base_filter_models import BaseComplexFilter
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter


class BaseDerivedModelParser:
    def __init__(self, **kwargs):
        self.distinct_on = None
        self.user = None
        for key, value in kwargs.items():
            if key == "distinct_on":
                # value has to conform to django models
                self.distinct_on = value

    def complex_filter_to_query(self, complex_filter: QueryComplexFilter):
        return complex_filter.build_query()

    def apply_complex_filter(self, complex_filter: QueryComplexFilter) -> QuerySet:
        pass

    def get_derived_model_class(self) -> typing.Type[BaseDerivedModel]:
        pass

    def get_queryset_value_list(self) -> [str]:
        pass

    def get_derived_model_field_list(self) -> [str]:
        pass

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [BaseDerivedModel]:
        filtered = self.apply_complex_filter(complex_filter)
        if self.distinct_on is not None:
            tuples = filtered.values_list(*self.distinct_on).distinct()
            fields = np.array(self.get_queryset_value_list())
            condition = False
            for field in self.distinct_on:
                condition = condition | (fields == field)
            original_keys = np.array(self.get_derived_model_field_list())
            indexes = np.where(condition)
            keys = original_keys[indexes]
        else:
            tuples = filtered.values_list(*self.get_queryset_value_list())
            keys = self.get_derived_model_field_list()
        derived_model_list = []
        for row in tuples:
            values_dict = {}
            for i in range(len(row)):
                values_dict[keys[i]] = row[i]
            derived_model_list.append(self.get_derived_model_class()(**values_dict))
        return derived_model_list

    def find_if_filters_by_field(self, complex_filter: BaseComplexFilter, field: str) -> bool:
        contains_field = False
        for simple_filter in complex_filter.filters:
            if issubclass(simple_filter.__class__, BaseComplexFilter):
                contains_field = contains_field or self.find_if_filters_by_field(simple_filter, field)
            else:
                contains_field = contains_field or simple_filter.field == field
        return contains_field
