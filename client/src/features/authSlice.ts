import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Auth {
    token: string | null;
    isAuthenticated: boolean | null;
    user: User | null;
}

export interface AuthState {
    auth: Auth
}

const initialState: AuthState = {
    auth: {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        user: null
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        unload: (state, action: PayloadAction<Auth>) => {
            localStorage.removeItem('token');
            state.auth.token = null;
            state.auth.isAuthenticated = false;
            state.auth.user = null;
        },
        load: (state, action: PayloadAction<Auth>) => {
            localStorage.setItem('token', String(action.payload.token));
            state.auth.token = action.payload.token;
            state.auth.isAuthenticated = true;
            state.auth.user = action.payload.user;
        }
    }
});

export const { load, unload } = authSlice.actions;
export default authSlice.reducer;
