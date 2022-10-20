import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
    Typography,
    Button,
} from "@mui/material";

export interface UserSessionProps {
    auth: { isAuthenticated: boolean, user: any },
    logout: () => void
}

interface UserSessionState {
    isAuthenticated: boolean,
    user: { username: string }
}

const mapStateToProps = (state: UserSessionProps) => ({
    auth: state.auth
});

const toHome = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/" }} />;
};

const toAbout = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/about" }} />;
};

const toDashboard = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/dashboard" }} />;
};

const toFiltering = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/filtering" }} />;
};

const endSession = (event: React.MouseEvent<HTMLElement>) => {
    logout();
    return <Navigate to={{ pathname: "/" }} />;
};

const toLogin = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/login" }} />;
};

const toRegister = (event: React.MouseEvent<HTMLElement>) => {
    return <Navigate to={{ pathname: "/register" }} />;
};

const authBar = (
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
            onClick={toHome}>
            Home
        </Button>
        <Button
            id="about"
            aria-haspopup="false"
            onClick={toAbout}>
            About
        </Button>
        <Button
            id="dashboard"
            aria-haspopup="false"
            onClick={toDashboard}>
            Dashboard
        </Button>
        <Button
            id="filtering"
            aria-haspopup="false"
            onClick={toFiltering}>
            Filtering
        </Button>
        <Button
            id="logout"
            aria-haspopup="false"
            onClick={endSession}>
            Logout
        </Button>
        <hr />
    </div>
);

const guestBar = (
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
            onClick={toHome}>
            Home
        </Button>
        <Button
            id="about"
            aria-haspopup="false"
            onClick={toAbout}>
            About
        </Button>
        <Button
            id="login"
            aria-haspopup="false"
            onClick={toLogin}>
            Login
        </Button>
        <Button
            id="register"
            aria-haspopup="false"
            onClick={toRegister}>
            Register
        </Button>
    </div>
);

export class MainNavBar extends Component<UserSessionProps, UserSessionState> {
    render() {
        const { isAuthenticated, user } = this.props.auth
        return (
            isAuthenticated ? authBar : guestBar
        )
    }
}

export default connect(mapStateToProps, { logout })(MainNavBar);