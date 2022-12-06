import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

export interface Stock {
    name: string;
    ticker: string;
    weight: number;
}

export interface Portfolio {
    id: string;
    stocks: Stock[];
}

export interface PortfolioState {
    portfolios: Portfolio[];
}

const initialState: PortfolioState = {
    portfolios: []
}

export const portfolioSlice = createSlice({
    name: "portfolios",
    initialState,
    reducers: {
        addPortfolio: (state, action: PayloadAction<Portfolio>) => {
            state.portfolios.push(action.payload)
        },
        deletePortfolio: (state, action: PayloadAction<number>) => {
            state.portfolios.splice(action.payload, 1)
        }
    }
})

export const { addPortfolio, deletePortfolio } = portfolioSlice.actions;
export default portfolioSlice.reducer;