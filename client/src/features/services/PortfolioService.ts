import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../authSlice";
import { PortfolioDetails } from "../types/Portfolio";

export async function userPortfolioDetails(authInfo: Auth) {
    console.log('Call to fetch portfolio details')
    const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authInfo.token}`
        }
      };
      return (await axios.get('/api/portfolio_selection', config)).data as PortfolioDetails    
}

export async function historicalData(authInfo:Auth, portfolioName:string) {
  console.log('Call to fetch historical data')
  const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authInfo.token}`
      }
    };
    const entryData = {
      "x_axis": {
        "attribute": "date",
        "granularity": "date"
      },
      "y_axis": {
        "attribute": "closing_proportional",
        "operation": "total",
        "granularity": "1"
      },
      "breakdown": {
        "attribute": "symbol",
        "granularity": "category"
      },
      "complex_filter": {
        "logic": "and",
        "filters": [
          {
            "logic": "or",
            "filters": [
              {
                "field": "name",
                "operator": "eq",
                "value": portfolioName
              }
            ]
          }
        ]
      }
    }
    return (await axios.post('/api/portfolio_historical', entryData, config)).data as any    

}