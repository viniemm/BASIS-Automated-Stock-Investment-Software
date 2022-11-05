import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { register } from '../../features/actions/auth';
import { createMessage, passwordNotMatch } from '../../features/actions/message';

import { Box, Button, TextField } from '@mui/material';

interface RegisterState {
    username: string,
    email: string,
    password: string,
    password2: string,
}

interface NewUser {
    username: string,
    password: string,
    email: string
}

interface RegisterProps {
    register: (newUser: NewUser) => void,
    isAuthenticated: boolean,
    createMessage: (msg: any) => void
}

// component level state (redux is not involved here)
export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        username: '',
        email: '',
        password: '',
        password2: '',
    };

    onSubmit = (event: any) => {
        event.preventDefault();
        const { username, email, password, password2 } = this.state; // destructuring used, pull from state
        if (password !== password2) {
            this.props.createMessage(passwordNotMatch);
        } else {
            const newUser = {
                username,
                password,
                email
            };
            this.props.register(newUser);
        }
    };

    onChangeUsername = (event: any) => {
        this.setState({ username: event.target.value });
    };

    onChangeEmail = (event: any) => {
        this.setState({ email: event.target.value });
    };

    onChangePassword = (event: any) => {
        this.setState({ password: event.target.value });
    };

    onChangePassword2 = (event: any) => {
        this.setState({ password2: event.target.value });
    };

    render() {
        if (this.props.isAuthenticated) { // login user, redirect user to dashboard
            return <Navigate to={{ pathname: "/dashboard" }} />;
        }
        const { username, email, password, password2 } = this.state;
        return (    // Link is used from react-router-dom
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
                        onChange={this.onChangeUsername}
                        value={username} />
                </div>
                <div>
                    <TextField
                        required
                        id='email'
                        label="email"
                        onChange={this.onChangeEmail}
                        value={email} />
                </div>
                <div>
                    <TextField
                        required
                        id='password'
                        label="password"
                        type="password"
                        onChange={this.onChangePassword}
                        value={password} />
                </div>
                <div>
                    <TextField
                        required
                        id='password2'
                        label="confirm password"
                        type="password"
                        onChange={this.onChangePassword2}
                        value={password2} />
                </div>
                <div>
                    <Button
                        id="register"
                        href='/dashboard'
                        onSubmit={this.onSubmit}>
                        Register
                    </Button>
                </div>
                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </Box>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);