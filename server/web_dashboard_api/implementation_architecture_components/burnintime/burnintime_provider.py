from django.db.models import Q

from web_dashboard_api.base_architecture_components.derived_model.base_derived_model_provider import \
    BaseDerivedModelProvider
from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_models import DerivedComplexFilter, \
    DerivedFilter
from web_dashboard_api.base_architecture_components.filter_derived.derived_operator_models import \
    DoesNotContainDerivedOperator, EqualsDerivedOperator
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter
from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_derived_model import \
    BurnInTimeDerivedModel
from web_dashboard_api.implementation_architecture_components.burnintime.burnintime_parser import \
    BurnInTimeDerivedModelParser
from web_dashboard_api.models import Multisitelamp


# Never use this class in lower level classes (especially in BaseFilter classes). It will lead to circular dependency
# Use BaseDerivedModelParser and similar instead
class BurnInTimeDerivedModelProvider(BaseDerivedModelProvider):
    def __init__(self, filter_collection_provider, **kwargs):
        derived_model_parser = None
        if "derived_model_parser" in kwargs:
            # Value has to conform to django models
            derived_model_parser = kwargs["derived_model_parser"]
            del kwargs["derived_model_parser"]
        if derived_model_parser is None:
            derived_model_parser = BurnInTimeDerivedModelParser()
        super().__init__(filter_collection_provider, derived_model_parser, **kwargs)

    def get_derived_model_list_from_filters(self, complex_filter: QueryComplexFilter) -> [BurnInTimeDerivedModel]:
        derived_models = super().get_derived_model_list_from_filters(complex_filter)
        # Filtering out KitKat Boards. Only leave panels
        query = Q()
        for derived_model in derived_models:
            query = query | Q(**{"panel_id": derived_model.lamp_id})
        query = query & Q(device_type__startswith="LowProfileLinear")
        panel_ids = Multisitelamp.objects.complex_filter(query).values_list("panel_id").distinct()
        derived_filters = []
        derived_filters.append(DerivedFilter("device_type", "LowProfileLinear", DoesNotContainDerivedOperator()))
        for panel_id in panel_ids:
            derived_filters.append(DerivedFilter("lamp_id", panel_id[0], EqualsDerivedOperator()))
        derived_models = self.apply_derived_filters(derived_models, DerivedComplexFilter('or', derived_filters))
        return derived_models

    def get_derived_model_list_from_json_filters(self, json_complex_filter_dict) -> [BurnInTimeDerivedModel]:
        return super().get_derived_model_list_from_json_filters(json_complex_filter_dict)

