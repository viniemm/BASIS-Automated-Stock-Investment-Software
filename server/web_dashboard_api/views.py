import traceback

import pandas as pd
import yfinance as yf
import pypfopt
from pypfopt import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
import json

from django.db.models import Q
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from web_dashboard_api.base_architecture_components.json_preprocessor import JsonPreprocessor
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_endpoint_processing import \
    IndicatorsAnalyticsEndpointProcessing
from .base_architecture_components.filter_query.query_filter_models import QueryComplexFilter, QueryFilter
from .base_architecture_components.filter_query.query_operator_models import EqualsQueryOperator
from .base_architecture_components.post_processing.base_endpoint_processing import BaseEndpointProcessing
from .implementation_architecture_components.endpoint_filters import IndicatorsReportEndpointFilters, EndpointFilters

# Create your views here.
from .implementation_architecture_components.indicators.analytics.indicators_analytics_parser import \
    IndicatorsAnalyticsDerivedModelParser
from .implementation_architecture_components.indicators.indicators_parser import IndicatorsDerivedModelParser
from .implementation_architecture_components.indicators.indicators_provider import IndicatorsDerivedModelProvider
from .models import StocksData


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


def populate(tots: list, term: int):
    data = yf.download(tickers=tots,
                       period=str(term) + "y",
                       interval="1d",
                       group_by='column',
                       auto_adjust=True,
                       prepost=False,
                       threads=True,
                       proxy=None
                       )
    return data["Close"]


def allocate(criteria: list, period: int) -> list:
    df = populate(tots=criteria, term=period)
    mu = expected_returns.mean_historical_return(df)
    s = risk_models.sample_cov(df)

    ef = EfficientFrontier(mu, s)
    # raw_weights = ef.max_sharpe()
    cleaned_weights = ef.clean_weights()
    # ef.save_weights_to_file("weights.csv")  # saves to file
    st = ef.portfolio_performance(verbose=True)
    return [cleaned_weights, st]



class QuestionnaireResponse(APIView):
    def post(self, request, format=None):
        try:
            filters_dict = JsonPreprocessor.request_to_json_dict(request)
            list_of_industries = ["Consumer Electronics"]
            list_of_filters = []
            for industry in list_of_industries:
                list_of_filters.append(QueryFilter('symbol__industry', industry, EqualsQueryOperator()))
            complex_filter = QueryComplexFilter(logic='or', filters=list_of_filters)
            indicators_derived_model_parser = IndicatorsAnalyticsDerivedModelParser()
            list_of_models = indicators_derived_model_parser.get_derived_model_list_from_filters(complex_filter)
            symbols = set()
            for model in list_of_models:
                symbols.add(model.symbol)
            print(symbols)
            # getting stock info
            # condition = Q()
            # for symbol in symbols:
            #     condition = condition | Q(symbol=symbol)
            # stock_data = StocksData.objects.filter(condition)
            # for stock_data_obj in stock_data:
            #     print(stock_data_obj.date)
            return Response()
        except Exception as e:
            traceback.print_exc()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
