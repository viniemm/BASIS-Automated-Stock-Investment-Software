import { GET_STOCKSDATA, DELETE_STOCKSDATA, ADD_STOCKSDATA } from '../actions/types.js';

const initialState = {
    ideas: []
}

// INCLUDE ANYTHING IN THE STATE
export default function (state = initialState, action) {
    switch (action.type) {
        case GET_STOCKSDATA:
            return {
                ...state,
                ideas: action.payload
            };
        case DELETE_STOCKSDATA:
            return {
                ...state,
                ideas: state.ideas.filter(idea => idea.id !== action.payload)
            }
        case ADD_STOCKSDATA:
            return {
                ...state,
                ideas: [...state.ideas, action.payload]
            }
        default:
            return state;
    }
}