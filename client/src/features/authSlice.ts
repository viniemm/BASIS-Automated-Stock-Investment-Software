import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Auth {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface AuthState {
    auth: Auth;
}

// isAuthenticated depends on localStorage token field
const initialState: AuthState = {
    auth: {
        user: null,
        token: localStorage.getItem('token'),
        isAuthenticated: false
    }
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        unloadUser: (state, action: PayloadAction<Auth>) => {
            localStorage.removeItem('token');
            state.auth.user = null;
            state.auth.token = null;
            state.auth.isAuthenticated = false;
        },
        loadUser: (state, action: PayloadAction<Auth>) => {
            localStorage.setItem('token', String(action.payload.token));
            state.auth.user = action.payload.user;
            state.auth.token = action.payload.token;
            state.auth.isAuthenticated = true;
        },
        getUser: (state, action: PayloadAction<User>) => {
            state.auth.user = action.payload;
            state.auth.isAuthenticated = true;
        }
    }
});

export const { loadUser, unloadUser, getUser } = authSlice.actions;
export default authSlice.reducer;
