import { combineReducers } from 'redux';
import stocksdata from './portfolios';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
    stocksdata,
    errors,
    messages,
    auth
});