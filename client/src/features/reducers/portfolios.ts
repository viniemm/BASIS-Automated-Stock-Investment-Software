import { GET_PORTFOLIO, DELETE_PORTFOLIO, ADD_PORTFOLIO } from '../actions/types';
import { RawStateStore } from '../types/StateModels';

const initialPortfolios:
    {
        id: string,
        name: string,
        stocks?: {
            name: string,
            ticker: string,
            weight: number
        }[]
    }[] = [];

const initialState: RawStateStore = {
    auth: {
        token: undefined,
        isAuthenticated: undefined,
        isLoading: false,
        user: {
            id: 0,
            username: '',
            email: ''
        }
    },
    portfolios: initialPortfolios // array of portfolios
}

// INCLUDE ANYTHING IN THE STATE
export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return {
                ...state,
                portfolios: action.payload // return current state of portfolio
            };
        case DELETE_PORTFOLIO:
            return {
                ...state,
                portfolios: state.portfolios && state.portfolios.filter(portfolio => portfolio.id !== action.payload) // get ids that don't match the portfolio to be deleted
            }
        case ADD_PORTFOLIO:
            return {
                ...state,
                portfolios: [...state.portfolios || [], action.payload] // append new portfolio to state
            }
        default:
            return state;
    }
}