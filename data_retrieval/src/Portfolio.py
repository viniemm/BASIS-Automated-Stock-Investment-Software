import pandas as pd
from pypfopt import EfficientFrontier
from pypfopt import risk_models
from pypfopt import expected_returns
import json

def allocate(criteria: list = ["GOOGL", "AAPL", "TSLA", "MSFT", "GS"])-> dict:
    df = pd.read_csv("SP500.csv", parse_dates=True, index_col="Date")[criteria]
    mu = expected_returns.mean_historical_return(df)
    S = risk_models.sample_cov(df)

    ef = EfficientFrontier(mu, S)
    raw_weights = ef.max_sharpe()
    cleaned_weights = ef.clean_weights()
    ef.save_weights_to_file("weights.csv")  # saves to file
    print(cleaned_weights)
    st = ef.portfolio_performance(verbose=True)
    print(st)

allocate()