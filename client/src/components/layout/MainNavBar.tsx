import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import {
    Typography,
    Button,
} from "@mui/material";

//     logout: () => void

export interface UserSessionProps {
    auth: { isAuthenticated: boolean, user: any },
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
        <Button
            id="logout"
            aria-haspopup="false"
            href='logout'>
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
            href='/'>
            Home
        </Button>
        <Button
            id="about"
            href='/about'>
            About
        </Button>
        <Button
            id="dashboard"
            href='/dashboard'>
            Dashboard
        </Button>
        <Button
            id="filtering"
            href='/filtering'>
            Filtering
        </Button>
    </div>
);

const defaultBar = (
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
            id='home'
            href='/'>
            Home
        </Button>
        <Button
            id='about'
            href='/about'>
            About
        </Button>
        <Button
            id="dashboard"
            href='/dashboard'>
            Dashboard
        </Button>
        <Button
            id="filtering"
            href='/filtering'>
            Filtering
        </Button>
        <Button
            id="questionnaire"
            href='/questionnaire'>
            Questionnaire
        </Button>
    </div>
)

export class MainNavBar extends Component<UserSessionProps, UserSessionState> {
    render() {
        return (
            defaultBar
        )
    }
}

export default connect(mapStateToProps)(MainNavBar);
// export default connect(mapStateToProps, { logout })(MainNavBar);
    // componentDidMount() { store.dispatch(loadUser()); doesn't fit here
    // isAuthenticated ? authBar : guestBar
    // const { isAuthenticated, user } = this.props.auth