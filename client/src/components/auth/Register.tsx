import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link, Box, Button, TextField } from '@mui/material';
import { Auth, loadUser } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';

interface RegisterProps {
    auth: Auth;
}

// component level state (redux is not involved here)
export default function Register({ auth }: RegisterProps) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    if (auth.isAuthenticated) {
        navigate('/dashboard')
    }

    return (    // Link is used from react-router-dom
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
                    onChange={(input) => setUsername(input.target.value)}
                    value={username} />
            </div>
            <div>
                <TextField
                    required
                    id='email'
                    label="email"
                    onChange={(input) => setEmail(input.target.value)}
                    value={email} />
            </div>
            <div>
                <TextField
                    required
                    id='password'
                    label="password"
                    type="password"
                    onChange={(input) => setPassword(input.target.value)}
                    value={password} />
            </div>
            <div>
                <TextField
                    required
                    id='password2'
                    label="confirm password"
                    type="password"
                    onChange={(input) => setPassword2(input.target.value)}
                    value={password2} />
            </div>
            <div>
                <Button
                    id="register"
                    onClick={(event) => {
                        event.preventDefault();
                        if (password !== password2) {
                            console.log("passwords don't match");
                        } else {
                            // Request Headers
                            const config: AxiosRequestConfig = {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }

                            // Request Body
                            const body: string = JSON.stringify({ username, email, password });

                            axios.post('/api/auth/register', body, config)
                                .then(response => {
                                    dispatch(loadUser(response.data));

                                })
                                .catch(error => {
                                    console.log(error)
                                })
                            setUsername('');
                            setEmail('');
                            setPassword('');
                            setPassword2('');

                            navigate('/dashboard')
                        }
                    }}>
                    Register
                </Button>
            </div>
            <p>
                Already have an account? <Link href="/login">
            Click here to Login
        </Link>
            </p>
        </Box>
    );
}