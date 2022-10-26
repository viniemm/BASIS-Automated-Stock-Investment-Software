import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { UserSessionProps } from '../../components/layout/MainNavBar';
import { Box, Button, TextField } from '@mui/material';

interface LoginState {
    username: string,
    password: string
}

interface LoginProps {
    login: (username: string, password: string) => void,
    isAuthenticated: boolean
}

export class Login extends Component<LoginProps, LoginState> {
    state = {
        username: '',
        password: ''
    };

    onSubmit = (event: any) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    onChangeUsername = (event: any) => {
        this.setState({ username: event.target.value });
    };

    onChangePassword = (event: any) => {
        this.setState({ password: event.target.value });
    };

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to={{ pathname: "/dashboard" }} />;
        }
        const { username, password } = this.state;
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
                        onChange={this.onChangeUsername}
                        value={username} />
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
                    <Button
                        id='login'
                        href='/dashboard'
                        onSubmit={this.onSubmit}>
                        Login
                    </Button>
                </div>
                <p>
                    Don&apos;t have an account? <Link to="/register">Register</Link>
                </p>
            </Box>
        );
    }
}

const mapStateToProps = (state: UserSessionProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);