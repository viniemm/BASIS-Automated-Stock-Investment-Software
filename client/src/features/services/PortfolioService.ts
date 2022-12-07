import axios, { AxiosRequestConfig } from "axios";
import { Auth } from "../authSlice";
import { PortfolioDetails } from "../types/Portfolio";

export async function userPortfolioDetails(authInfo: Auth) {
    console.log('Call about to start')
    const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authInfo.token}`
        }
      };
      return (await axios.get('/api/portfolio_selection', config)).data as PortfolioDetails    
}