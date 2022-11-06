import React, { Component, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { Auth, load } from '../../../features/authSlice';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';

interface LoginProps {
    authState: Auth;
}

export default function Login({ authState }: LoginProps) {
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (authState.isAuthenticated) {
        return <Navigate to={{ pathname: "/dashboard" }} />;
    }
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '40ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    required
                    id='username'
                    label="username"
                    onChange={(input) => {
                        setUsername(input.target.value);
                    }}
                    value={username} />
            </div>
            <div>
                <TextField
                    required
                    id='password'
                    label="password"
                    type="password"
                    onChange={(input) => {
                        setPassword(input.target.value)
                    }}
                    value={password} />
            </div>
            <div>
                <Button
                    id='login'
                    href='/dashboard'
                    onSubmit={() => {
                        if (!username || !password) {
                            console.log("empty username or password");
                            return;
                        }
                        // config headers
                        const config: AxiosRequestConfig = {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                        // Request Body
                        const body = JSON.stringify({ username, password });
                        axios.post('/api/auth/login', body, config)
                            .then(response => {
                                dispatch(load(response.data))
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }}>
                    Login
                </Button>
            </div>
            <p>
                Don&apos;t have an account? <Link to="/register">Register</Link>
            </p>
        </Box>
    );
}