from web_dashboard_api.base_architecture_components.filter_derived.derived_filter_models import DerivedComplexFilter, \
    DerivedFilter
from web_dashboard_api.base_architecture_components.filter.base_filter_available import BaseFilterAvailable
from web_dashboard_api.base_architecture_components.filter.base_filter_parser import BaseFilterParser
from web_dashboard_api.base_architecture_components.filter.base_filter_wrapper import BaseFilterWrapper
from web_dashboard_api.base_architecture_components.filter_query.query_filter_models import QueryComplexFilter, QueryFilter
from web_dashboard_api.base_architecture_components.properties import FieldValueLabel
from web_dashboard_api.exceptions.custom_exceptions import ParsingException


class BaseComplexFilterParser:
    def __init__(self, filter_parsers: [BaseFilterParser]):
        self.filter_parsers = filter_parsers

    def get_filter_parser_by_field(self, field: str) -> BaseFilterParser:
        filter_found = None
        for filter_parser in self.filter_parsers:
            if filter_parser.filter_available.field in field.split("__"):
                filter_found = filter_parser
        if filter_found is None:
            raise ParsingException("One or more of the filters are not supported at this endpoint.")
        return filter_found

    def instantiate_derived_complex_filter(self, **kwargs) -> DerivedComplexFilter:
        return DerivedComplexFilter(**kwargs)

    def instantiate_query_complex_filter(self, **kwargs) -> QueryComplexFilter:
        return QueryComplexFilter(**kwargs)

    def is_complex_filter(self, json_complex_filter) -> bool:
        return 'logic' in json_complex_filter and 'filters' in json_complex_filter

    def complex_filter_parsing(self, json_complex_filter) -> (QueryComplexFilter, DerivedComplexFilter):
        parsed_derived_complex_filter = DerivedComplexFilter(logic='and', filters=[])
        parsed_query_complex_filter = QueryComplexFilter(logic='and', filters=[])
        if self.is_complex_filter(json_complex_filter):
            parsed_derived_filters = []
            parsed_query_filter = []
            if "logic" not in json_complex_filter or "filters" not in json_complex_filter:
                # raise ParsingException("One or more of the filters are not formatted properly.")
                json_complex_filter['logic'] = 'and'
                json_complex_filter['filters'] = []
            logic = json_complex_filter['logic']
            filters = json_complex_filter['filters']
            if logic in ['or', 'and']:
                for unit_filter in filters:
                    if self.is_complex_filter(unit_filter):
                        parsed_filters = self.complex_filter_parsing(unit_filter)
                    else:
                        if "field" not in unit_filter:
                            raise ParsingException("One or more of the filters are not formatted properly.")
                        filter_found = self.get_filter_parser_by_field(unit_filter["field"])
                        parsed_filters = [filter_found.filter_parsing(unit_filter)]
                    for parsed_filter in parsed_filters:
                        if parsed_filter is not None:
                            if isinstance(parsed_filter, DerivedFilter) or isinstance(parsed_filter, DerivedComplexFilter):
                                parsed_derived_filters.append(parsed_filter)
                            if isinstance(parsed_filter, QueryFilter) or isinstance(parsed_filter, QueryComplexFilter):
                                parsed_query_filter.append(parsed_filter)
                parsed_derived_complex_filter = DerivedComplexFilter(logic=logic, filters=parsed_derived_filters)
                parsed_query_complex_filter = QueryComplexFilter(logic=logic, filters=parsed_query_filter)
        return parsed_query_complex_filter, parsed_derived_complex_filter


class BaseFilterWrapperCollection:
    def __init__(self, filter_providers: [BaseFilterWrapper]):
        self.filter_wrappers = filter_providers

    def get_filter_available_list(self) -> [BaseFilterAvailable]:
        filters_available = []
        for filter_provider in self.filter_wrappers:
            filters_available.append(filter_provider.filter_available)
        return filters_available

    def get_filter_parser_list(self) -> [BaseFilterParser]:
        filter_parsers = []
        for filter_provider in self.filter_wrappers:
            filter_parsers.append(filter_provider.filter_parser)
        return filter_parsers

    def get_complex_filter_parser(self) -> BaseComplexFilterParser:
        return BaseComplexFilterParser(self.get_filter_parser_list())

    def get_on_distinct_attribute(self, table_attr, attribute, parser_class, user=None):
        attributes = []
        complex_filter = QueryComplexFilter('and', [])
        indicators_derived_model_parser = parser_class(distinct_on=[table_attr])
        if user is not None:
            indicators_derived_model_parser.user = user
        derived_models = indicators_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
        for derived_model in derived_models:

            attributes.append((getattr(derived_model, attribute), getattr(derived_model, attribute)))
        # Make sure no duplicates
        attributes = list(set(attributes))
        attributes.sort()
        attributes_list = []
        for value, label in attributes:
            attributes_list.append(FieldValueLabel(value, label))
        return attributes_list
