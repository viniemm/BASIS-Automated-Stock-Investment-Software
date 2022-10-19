// ALL HTTP REQUESTS GO HERE
// UTILIZING AXIOS
// handles Redux state to reduce data from database to useful state for client

import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { GET_PORTFOLIO, DELETE_PORTFOLIO, ADD_PORTFOLIO, GET_ERRORS } from './types';
import { tokenConfig } from './auth';

// GET PORTFOLIO
export const getPortfolios = () => (dispatch, getState) => {
    axios
        .get('/api/ideas/', tokenConfig(getState))
        .then(response => {
            dispatch({
                type: GET_PORTFOLIO,
                payload: response.data
            });
        }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};

// DELETE PORTFOLIO
export const deletePortfolio = (id) => (dispatch, getState) => {
    axios
        .delete(`/api/ideas/${id}/`, tokenConfig(getState))
        .then(response => {
            dispatch(createMessage({ deletePortfolio: 'Portfolio Deleted' }));
            dispatch({
                type: DELETE_PORTFOLIO,
                payload: id
            });
        }).catch(error => console.log(error.response.data));
};

// ADD PORTFOLIO
export const addPortfolio = (portfolio) => (dispatch, getState) => {
    axios
        .post('/api/portfolio/', portfolio, tokenConfig(getState))
        .then(response => {
            dispatch(createMessage({ addPortfolio: 'Portfolio Added' }));
            dispatch({
                type: ADD_PORTFOLIO,
                payload: response.data
            });
        }).catch(error => dispatch(returnErrors(error.response.data, error.response.status)));
};