import { combineReducers } from 'redux';
import stocksdata from './portfolios';
import errors from './errors';
import messages from './messages';
import auth from './auth.js';

export default combineReducers({
    stocksdata,
    errors,
    messages,
    auth
});