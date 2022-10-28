import { combineReducers } from 'redux';
import portfolios from './portfolios';
import error from './error';
import message from './message';
import auth from './auth';

export default combineReducers({
    auth,
    error,
    message,
});