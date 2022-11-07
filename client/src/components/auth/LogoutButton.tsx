import { Button } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import React from 'react';
import { useDispatch } from 'react-redux';
import { unloadUser } from '../../features/authSlice';
import { Auth } from '../../features/authSlice';

interface LogoutProps {
    auth: Auth;
}

export default function LogoutButton({ auth }: LogoutProps) {
    const dispatch = useDispatch();

    return (
        <Button
            id="logout"
            href='/dashboard'
            onClick={() => {
                // Get Token from State
                const token = auth.token;

                // Headers
                const config: AxiosRequestConfig = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${token}`
                    }
                };

                axios.post('/api/auth/logout', null, config)
                    .then(result => {
                        dispatch(unloadUser(auth));
                    })
                    .catch(error => {
                        console.log(error.response.msg);
                    })
            }}>
            Logout
        </Button>
    )
}
