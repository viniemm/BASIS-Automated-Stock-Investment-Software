import React, { Component, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Link } from '@mui/material';
import { Auth, loadUser } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';

interface LoginProps {
    auth: Auth;
}

export default function Login({ auth }: LoginProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (auth.isAuthenticated) {
        navigate('/');
    }

    return (

        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 2, width: '60ch',
                fontSize: 25, },
                display: 'flex',
                alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              marginTop: '10%'
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
                    sx={{
                        borderColor: 'black', borderWidth: '2px'}}
                    onClick={() => {
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
                                dispatch(loadUser(response.data));
                            })
                            .catch(error => {
                                console.log("couldn't login");
                            })
                        setUsername('');
                        setPassword('');
                        navigate('/')
                    }}>
                    Login
                </Button>
            </div>
            <p>
                Don&apos;t have an account? <Link href="/register">
  Click here to Register
</Link>
            </p>
        </Box>
    );
}