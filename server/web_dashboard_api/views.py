import traceback

import uuid
import yfinance as yf
from django.contrib.auth.models import User
from pypfopt import EfficientFrontier, expected_returns, risk_models
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from web_dashboard_api.base_architecture_components.json_preprocessor import JsonPreprocessor
from web_dashboard_api.implementation_architecture_components.indicators.analytics.indicators_analytics_endpoint_processing import \
    IndicatorsAnalyticsEndpointProcessing
from .base_architecture_components.filter_derived.derived_filter_models import DerivedFilter, DerivedComplexFilter
from .base_architecture_components.filter_derived.derived_operator_models import EqualsDerivedOperator
from .base_architecture_components.filter_query.query_filter_models import QueryComplexFilter, QueryFilter
from .base_architecture_components.filter_query.query_operator_models import EqualsQueryOperator
from .base_architecture_components.post_processing.base_endpoint_processing import BaseEndpointProcessing
from .implementation_architecture_components.endpoint_filters import IndicatorsReportEndpointFilters, EndpointFilters, \
    PortfolioHistoricalReportEndpointFilters
# Create your views here.
from .implementation_architecture_components.indicators.analytics.indicators_analytics_parser import \
    IndicatorsAnalyticsDerivedModelParser
from .implementation_architecture_components.industries import industry_types
from .implementation_architecture_components.portfolio_historical.historical.portfolio_historical_endpoint_processing import \
    PortfolioHistoricalEndpointProcessing
from .models import Portfolio, PortfolioSelection, Companies


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


class PortfolioHistoricalReport(ReportAPIView):
    def get_endpoint_processing_class(self, filters_dict) -> PortfolioHistoricalEndpointProcessing:
        return PortfolioHistoricalEndpointProcessing(filters_dict)


class PortfolioHistoricalReportFilters(ReportFilterAPIView):
    def get_endpoint_filters(self) -> EndpointFilters:
        return PortfolioHistoricalReportEndpointFilters()


class QuestionnaireResponse(APIView):
    def post(self, request, format=None):
        # TODO: add auth middleware instead of passing the user
        try:
            filters_dict = JsonPreprocessor.request_to_json_dict(request)
            print(filters_dict)
            list_of_industries = filters_dict['answers']['industries']
            list_of_filters = []

            for industry_type in list_of_industries:
                for industry in industry_types[industry_type]:
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
            allocation = self.allocate(list(symbols), 5)
            # Storing portfolio in DB
            user = User.objects.get(id=filters_dict['user']['id'])
            portfolio_uuid = uuid.uuid4()
            portfolio_name = filters_dict['answers']['name'] if 'name' in filters_dict['answers'] else portfolio_uuid
            last_id_object = Portfolio.objects.latest('id')
            value = filters_dict['answers']['value'] if 'value' in filters_dict['answers'] else 100
            portfolio = Portfolio(id=int(last_id_object.id)+1, name=portfolio_name, user=user, value=value)
            portfolio.save()
            last_id_portfolio_selection = PortfolioSelection.objects.latest('id')
            last_id = int(last_id_portfolio_selection.id)
            for symbol, value in allocation[0].items():
                last_id += 1
                portfolio_selection = PortfolioSelection(id=last_id, portfolio=portfolio, symbol=Companies(symbol=symbol), allocation=value)
                portfolio_selection.save()
            return Response(allocation, status=status.HTTP_200_OK)
        except Exception as e:
            traceback.print_exc()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)

    def populate(self, tots: list, term: int):
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

    def allocate(self, criteria: list, period: int) -> list:
        df = self.populate(tots=criteria, term=period)
        ef = EfficientFrontier(expected_returns.mean_historical_return(df), risk_models.sample_cov(df))
        weights = ef.max_sharpe()
        cleaned_weights = ef.clean_weights()
        st = ef.portfolio_performance(verbose=True)
        return [{k:v for k, v in cleaned_weights.items() if v > 0}, st]

class FilterDetails(ReportFilterAPIView):
    def get_endpoint_filter_details(self) -> EndpointFilters:
        return FilterDetailsEndpoint()
