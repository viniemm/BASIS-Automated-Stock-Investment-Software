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
from collections import defaultdict
from datetime import datetime
from django.utils.timezone import make_aware
import pytz

from pypfopt.discrete_allocation import DiscreteAllocation, get_latest_prices


class ReportAPIView(APIView):
    def get_endpoint_processing_class(self, filters_dict) -> BaseEndpointProcessing:
        pass

    def post(self, request, format=None):
        try:
            filters_dict = JsonPreprocessor.request_to_json_dict(request)
            endpoint_processing = self.get_endpoint_processing_class(
                filters_dict)
            return_dict = endpoint_processing.get_endpoint_return(request.user)

            return Response(return_dict)
        except Exception as e:
            traceback.print_exc()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


class ReportFilterAPIView(APIView):
    def get_endpoint_filters(self) -> EndpointFilters:
        pass

    def post(self, request, format=None):
        try:
            filters = self.get_endpoint_filters()

            return Response(filters.make_jsonable_dict())
        except Exception as e:
            traceback.print_exc()
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)


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
        return PortfolioHistoricalReportEndpointFilters(self.request.user)


class QuestionnaireResponse(APIView):
    def post(self, request, format=None):
        if self.request.user.is_authenticated:
            try:
                filters_dict = JsonPreprocessor.request_to_json_dict(
                    request)
                print(filters_dict)
                list_of_industries = filters_dict['answers']['industries']
                list_of_filters = []

                for industry_type in list_of_industries:
                    for industry in industry_types[industry_type]:
                        list_of_filters.append(QueryFilter(
                            'symbol__industry', industry, EqualsQueryOperator()))
                complex_filter = QueryComplexFilter(
                    logic='or', filters=list_of_filters)
                indicators_derived_model_parser = IndicatorsAnalyticsDerivedModelParser()
                list_of_models = indicators_derived_model_parser.get_derived_model_list_from_filters(
                    complex_filter)
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
                
                time_period = filters_dict['answers']['termPeriod'] if 'termPeriod' in filters_dict['answers'] else 2
                value = filters_dict['answers']['moneyInvested'] if 'moneyInvested' in filters_dict['answers'] else 1000
                allocation = self.allocate(list(symbols), time_period, int(value))
                # Storing portfolio in DB
                
                user = self.request.user
                portfolio_uuid = uuid.uuid4()
                portfolio_name = filters_dict['answers']['name'] if 'name' in filters_dict['answers'] else portfolio_uuid
                last_id_object = Portfolio.objects.latest('id')
                print(last_id_object.id)
                
                now = datetime.now()
                old_id = int(last_id_object.id)
                new_id = old_id + 1

                portfolio = Portfolio(id=new_id, name=portfolio_name,
                                      created_at=make_aware(now), user=user, value=value)
                print(portfolio.id)
                portfolio.save()
                last_id_portfolio_selection = PortfolioSelection.objects.latest(
                    'id')
                last_id = int(last_id_portfolio_selection.id)
                for symbol, value in allocation[0].items():
                    last_id += 1
                    portfolio_selection = PortfolioSelection(
                        id=last_id, portfolio=portfolio, symbol=Companies(symbol=symbol), allocation=value)
                    portfolio_selection.save()
                return Response(allocation, status=status.HTTP_200_OK)
            except Exception as e:
                traceback.print_exc()
                return Response(str(e.__cause__), status=status.HTTP_400_BAD_REQUEST)

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

    def allocate(self, criteria: list, period: int, val: int) -> list:
        df = self.populate(tots=criteria, term=period)
        ef = EfficientFrontier(expected_returns.mean_historical_return(
            df), risk_models.sample_cov(df))
        # weights = ef.max_sharpe()
        cleaned_weights = ef.clean_weights()
        st = ef.portfolio_performance(verbose=True)
        
        latest_prices = get_latest_prices(df)

        da = DiscreteAllocation(cleaned_weights, latest_prices, val)
        allocation, leftover = da.greedy_portfolio()
        print("Discrete allocation:", allocation)
        print("Funds remaining: ${:.2f}".format(leftover))
        
        return [allocation, leftover]


class PortfolioSelectionView(APIView):
    def get(self, request) -> Response:
        if self.request.user.is_authenticated:
            try:
                query_set = PortfolioSelection.objects.filter(
                    portfolio__user=self.request.user)
                tuples_list = query_set.values_list(*['portfolio__name', 'portfolio__id', 'portfolio__value', 'symbol__symbol', 'symbol__long_name', 'allocation'])

                id_alloc = defaultdict(list)
                id_name = defaultdict(dict)
                print(tuples_list)
                for row in tuples_list:
                    id_alloc[row[1]].append({
                        'symbol': row[3],
                        'name': row[4],
                        'allocation': row[5]
                    })

                for row in tuples_list:
                    id_name[row[1]]['name'] = row[0]
                    id_name[row[1]]['value'] = row[2]
                    id_name[row[1]]['allocations'] = id_alloc[row[1]]
                final_rows = []
                for val in id_name:
                    final_rows.append(id_name[val])
                #json_response = json.dumps(id_name)
                return Response({"portfolios" : final_rows}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
