import pandas as pd

companies_df = pd.read_csv("./data_origin/sp500_companies.csv")
companies_cols = companies_df.columns.tolist()
companies_cols = [companies_cols[1]] + companies_cols[:1] + companies_cols[2:]
companies_df = companies_df[companies_cols]

stocks_df = pd.read_csv("./data_origin/sp500_stocks.csv")
# stocks_df = stocks_df[stocks_df.Symbol.isin(companies_df['Symbol'])]

# Indicators
indicators = [
    pd.read_csv("./data_origin/2014_Financial_Data.csv"),
    pd.read_csv("./data_origin/2015_Financial_Data.csv"),
    pd.read_csv("./data_origin/2016_Financial_Data.csv"),
    pd.read_csv("./data_origin/2017_Financial_Data.csv"),
    pd.read_csv("./data_origin/2018_Financial_Data.csv")
]

for i in range(5):
    indicators[i] = indicators[i].rename(columns={"Unnamed: 0": "Symbol"})
    indicators[i] = indicators[i][indicators[i].Symbol.isin(companies_df['Symbol'])]

for year in range(2015, 2020):
    cols = indicators[year % 2015].columns.tolist()
    cols_dict = {}
    for col in cols:
        cols_dict[col] = col.replace(' ', '_')
        cols_dict[col] = cols_dict[col].replace('-', '')
        cols_dict[col] = cols_dict[col].lower()
        if col[0].isnumeric():
            cols_dict[col] = '_' + cols_dict[col]
        if str(year) in col:
            cols_dict[col] = cols_dict[col].replace(str(year), "year")
    indicators[year % 2015] = indicators[year % 2015].rename(columns=cols_dict)

indicators_cols = ['year'] + indicators[0].columns.tolist()

for year in range(2014, 2019):
    indicators[year % 2014]['year'] = year

for i in range(5):
    indicators[i] = indicators[i][indicators_cols]

indicators_df = pd.concat(indicators)

headers = ['year', 'symbol', 'revenue', 'revenue_growth', 'gross_profit', 'r&d_expenses', 'operating_expenses', 'operating_income', 'interest_expense', 'net_income', 'dividend_per_share', 'profit_margin', 'ebitda', 'ebit', 'total_current_assets', 'total_assets', 'total_debt', 'total_liabilities', 'total_shareholders_equity', 'investments', 'dividend_payments', 'netprofitmargin', 'revenue_per_share', 'net_income_per_share', 'free_cash_flow_per_share', 'cash_per_share', 'market_cap', 'pe_ratio', 'debt_to_equity', 'debt_to_assets', 'dividend_yield', 'r&d_to_revenue', 'gross_profit_growth', 'net_income_growth', 'weighted_average_shares_growth', 'free_cash_flow_growth', '_10y_revenue_growth_(per_share)', '_5y_revenue_growth_(per_share)', '_3y_revenue_growth_(per_share)', '_10y_net_income_growth_(per_share)', '_5y_net_income_growth_(per_share)', '_3y_net_income_growth_(per_share)', 'asset_growth', 'debt_growth']
indicators_df = indicators_df.reset_index()
indicators_df = indicators_df[headers]
# output to csv
# companies_df.to_csv('./out/companies.csv', index=False)
# indicators_df.to_csv('./out/indicators.csv')
# stocks_df.to_csv('./out/stocks.csv')


from sqlalchemy import create_engine
engine = create_engine('postgresql://csds395:csds3950@127.0.0.1:5432/stocks')
stocks_cols = stocks_df.columns.tolist()
cols_dict = {}
for col in stocks_cols:
    cols_dict[col] = col.lower()
stocks_df = stocks_df.rename(columns=cols_dict)
# companies_df.to_sql('companies', con=engine, schema='stocks', if_exists='replace')
# indicators_df.to_sql('indicators', con=engine, schema='stocks', if_exists='replace')
stocks_df.to_sql('stocks_data', con=engine, schema='stocks', if_exists='replace')



print()
















