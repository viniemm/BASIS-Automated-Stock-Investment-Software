import traceback

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from web_dashboard_api.base_architecture_components.json_preprocessor import JsonPreprocessor
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_endpoint_processing import \
    IndicatorsAnalyticsEndpointProcessing
from .base_architecture_components.post_processing.base_endpoint_processing import BaseEndpointProcessing
from .implementation_architecture_components.endpoint_filters import IndicatorsReportEndpointFilters, EndpointFilters


# Create your views here.

class ReportAPIView(APIView):
    def get_endpoint_processing_class(self, filters_dict) -> BaseEndpointProcessing:
        pass

    """
    List all snippets, or create a new snippet.
    """
    def post(self, request, format=None):
        try:
            filters_dict = JsonPreprocessor.request_to_json_dict(request)
            endpoint_processing = self.get_endpoint_processing_class(filters_dict)
            return_dict = endpoint_processing.get_endpoint_return()

            return Response(return_dict)
        except Exception as e:
            traceback.print_exc()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class ReportFilterAPIView(APIView):
    def get_endpoint_filters(self) -> EndpointFilters:
        pass

    """
    List all snippets, or create a new snippet.
    """
    def post(self, request, format=None):
        filters = self.get_endpoint_filters()
        return Response(filters.make_jsonable_dict())


class IndicatorsReport(ReportAPIView):
    def get_endpoint_processing_class(self, filters_dict) -> IndicatorsAnalyticsEndpointProcessing:
        return IndicatorsAnalyticsEndpointProcessing(filters_dict)


class IndicatorsReportFilters(ReportFilterAPIView):
    def get_endpoint_filters(self) -> EndpointFilters:
        return IndicatorsReportEndpointFilters()

class FilterDetails(ReportFilterAPIView):
    def get_endpoint_filter_details(self) -> EndpointFilters:
        return FilterDetailsEndpoint()