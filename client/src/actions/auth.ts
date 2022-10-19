import axios from 'axios';
const returnErrors = {} as any;

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

// CHECK TOKEN AND LOAD USER
export const loadUser = () => (dispatch: (arg0: { type: string; payload?: any; }) => void, getState: any) => {
    // User Loading
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(result => {
            dispatch({
                type: USER_LOADED,
                payload: result.data
            });
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
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
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: LOGIN_FAIL
            });
        })
}

// REGISTER USER
interface UserRegistration {
    username: string,
    password: string,
    email: string
}
export const register = (userInfo: UserRegistration) => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {



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
            dispatch(returnErrors(error.response.data, error.response.status));
            dispatch({
                type: REGISTER_FAIL
            });
        })
}



// CHECK TOKEN AND LOGOUT USER
export const logout = () => (dispatch: (arg0: { type: string; }) => void, getState: any) => {

    axios.post('/api/auth/logout', null, tokenConfig(getState))
        .then(result => {
            dispatch({
                type: LOGOUT_SUCCESS
            });
        }).catch(error => {
            dispatch(returnErrors(error.response.data, error.response.status));
        })
}

// Set Up Config with Token - helper
export const tokenConfig = (getState: () => { (): any; new(): any; auth: { (): any; new(): any; token: any; }; }) => {
    // Get Token from State
    const token = getState().auth.token;

    // Headers
    const headers = { 'Content-Type': 'application/json'} as any;
    const config = {
        headers
    }

    if (token) {
        config.headers['Authorization'] = `Token ${token}`;
    }

    return config;
}