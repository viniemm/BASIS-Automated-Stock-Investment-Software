import { GET_PORTFOLIO, DELETE_PORTFOLIO, ADD_PORTFOLIO } from '../actions/types';
import { State } from '../types/Redux';

const initialState:State = {
    portfolios: [] // array of portfolios
}

// INCLUDE ANYTHING IN THE STATE
export default function (state = initialState, action: any) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return {
                ...state,
                ideas: action.payload // return current state of portfolio
            };
        case DELETE_PORTFOLIO:
            return {
                ...state,
                ideas: state.portfolios && state.portfolios.filter(portfolio => portfolio.id !== action.payload) // get ids that don't match the portfolio to be deleted
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