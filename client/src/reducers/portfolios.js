import { GET_PORTFOLIO, DELETE_PORTFOLIO, ADD_PORTFOLIO } from '../actions/types.js';

const initialState = {
    portfolios: [] // array of portfolios
}

// INCLUDE ANYTHING IN THE STATE
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PORTFOLIO:
            return {
                ...state,
                ideas: action.payload // return current state of portfolio
            };
        case DELETE_PORTFOLIO:
            return {
                ...state,
                ideas: state.portfolios.filter(portfolio => portfolio.id !== action.payload) // get ids that don't match the portfolio to be deleted
            }
        case ADD_PORTFOLIO:
            return {
                ...state,
                portfolios: [...state.portfolios, action.payload] // append new portfolio to state
            }
        default:
            return state;
    }
}