import axios from 'axios';
import { State } from '../types/StateModels';
import { returnError } from './message'

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from './types';

// CHECK TOKEN AND LOGOUT USER
export const logout = () => (dispatch: (arg0: { type: string }) => void, getState: any) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(result => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(error => {
            dispatch(returnError(error.response.data, error.response.status));
        })
}

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: () => State) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    const config = tokenConfig(getState)
    const isAuthenticated = getState().auth.isAuthenticated

    axios.get('/api/auth/user', config)
        .then(result => {
            dispatch({
                type: USER_LOADED,
                payload: result.data
            });
        }).catch(error => {
            dispatch(returnError(error.response.data, error.response.status));
            dispatch({
                type: AUTH_ERROR
            });
        })

}

// LOGIN USER
export const login = (username: string, password: string) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password });

    axios.post('/api/auth/login', body, config)
        .then(result => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: result.data
            });
        }).catch(error => {
            dispatch(returnError(error.response.data, error.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

export const register = (userInfo: { username: string, email: string, password: string }) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {

    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify(userInfo);

    axios.post('/api/auth/register', body, config)
        .then(result => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: result.data
            });
        }).catch(error => {
            dispatch(returnError(error.response.data, error.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

// Set Up Config with Token - helper
// Tarun's getState def: (getState: () => { (): any; new(): any; auth: { (): any; new(): any; token: any; }; })
// mine: (getState: () => { auth: auth })
export const tokenConfig = (getState: () => State) => {
    // Get Token from State
    const token = getState().auth.token;

    // Headers
    const config = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
    } as any;

    return config;
}