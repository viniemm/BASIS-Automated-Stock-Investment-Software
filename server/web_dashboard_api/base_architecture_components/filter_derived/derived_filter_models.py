from web_dashboard_api.base_architecture_components.filter_derived.derived_operator_models import BaseDerivedOperator
from web_dashboard_api.base_architecture_components.filter.base_filter_models import BaseFilter, BaseComplexFilter


class DerivedFilter(BaseFilter):
    def __init__(self, field: str, value, operator: BaseDerivedOperator):
        super().__init__(field, value, operator)

    def passes_filter(self, obj):
        return self.operator.passes_filter(obj, self.field, self.value)


class DerivedComplexFilter(BaseComplexFilter):
    def __init__(self, logic: str, filters):
        super().__init__(logic, filters)

    def passes_filter(self, obj):
        if len(self.filters) == 0:
            return True
        if self.logic == 'or':
            complex_condition = False
        else:
            complex_condition = True
        for query_filter in self.filters:
            curr_query = query_filter.passes_filter(obj)
            if self.logic == 'and':
                if not complex_condition:
                    break
                complex_condition = complex_condition & curr_query
            elif self.logic == 'or':
                if complex_condition:
                    break
                complex_condition = complex_condition | curr_query
        return complex_condition
