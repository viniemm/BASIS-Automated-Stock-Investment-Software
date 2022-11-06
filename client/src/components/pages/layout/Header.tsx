import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../features/actions/auth';
import {
    Typography,
    Button,
} from "@mui/material";
import { Auth } from '../../../features/authSlice';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch } from 'react-redux';

//     logout: () => void

export interface UserSessionProps {
    auth: { isAuthenticated: boolean, user: any },
}

interface UserSessionState {
    isAuthenticated: boolean,
    user: { username: string }
}

interface HeaderProps {
    authState: Auth;
}

export default function Header({ authState }: HeaderProps) {

    if (authState.isAuthenticated === null) {
        return (
            <div>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}>
                    BASIS
                </Typography>
                <Button
                    id="home"
                    aria-haspopup="false"
                    href='/'>
                    Home
                </Button>
                <Button
                    id="about"
                    aria-haspopup="false"
                    href='/about'>
                    About
                </Button>
                <Button
                    id="dashboard"
                    aria-haspopup="false"
                    href='/dashboard'>
                    Dashboard
                </Button>
                <Button
                    id="filtering"
                    aria-haspopup="false"
                    href='/filtering'>
                    Filtering
                </Button>
                <LogoutButton authState={authState} />
                <hr />
            </div>
        );
    }
    else return (
        <div>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}>
                BASIS
            </Typography>
            <Button
                id="login"
                href='/login'>
                Login
            </Button>
            <Button
                id="register"
                href='/register'>
                Register
            </Button>
        </div>
    )
}

// export default connect(mapStateToProps, { logout })(MainNavBar);
    // componentDidMount() { store.dispatch(loadUser()); doesn't fit here
    // isAuthenticated ? authBar : guestBar
    // const { isAuthenticated, user } = this.props.auth



