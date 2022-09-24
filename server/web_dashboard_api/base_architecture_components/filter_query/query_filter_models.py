from django.db.models import Q

from web_dashboard_api.base_architecture_components.filter.base_filter_models import BaseFilter, BaseComplexFilter
from web_dashboard_api.base_architecture_components.filter_query.query_operator_models import BaseQueryOperator


class QueryFilter(BaseFilter):
    def __init__(self, field: str, value, operator: BaseQueryOperator):
        super().__init__(field, value, operator)

    def build_query(self):
        return self.operator.build_query(self.field, self.value)


class ForeignQueryFilter(QueryFilter):
    def __init__(self, field: str, value, foreign_table: str, operator: BaseQueryOperator):
        super().__init__(f"{foreign_table}__{field}", value, operator)


class QueryComplexFilter(BaseComplexFilter):
    def __init__(self, logic: str, filters):
        super().__init__(logic, filters)

    def build_query(self):
        complex_query = Q()
        for query_filter in self.filters:
            curr_query = query_filter.build_query()
            if complex_query is None:
                complex_query = curr_query
            else:
                if self.logic == 'and':
                    complex_query = complex_query & curr_query
                elif self.logic == 'or':
                    complex_query = complex_query | curr_query
        return complex_query
