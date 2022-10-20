import { combineReducers } from 'redux';
import portfolios from './portfolios';
import errors from './errors';
import messages from './messages';
import auth from './auth';

export default combineReducers({
    auth,
    errors,
    messages,
});