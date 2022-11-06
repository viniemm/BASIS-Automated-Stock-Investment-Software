import { Button } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { unload } from '../../../features/authSlice';
import { Auth } from '../../../features/authSlice';

interface LogoutProps {
    authState: Auth;
}

export default function LogoutButton({ authState }: LogoutProps) {
    const dispatch = useDispatch();

    return (
        <Button
            id="logout"
            onClick={() => {
                // Get Token from State
                const token: string = String(authState.token);

                // Headers
                const config: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                };

                axios.post('/api/auth/logout', null, config)
                    .then(result => {
                        dispatch(unload(authState))
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }}>
            Logout
        </Button>
    )
}
