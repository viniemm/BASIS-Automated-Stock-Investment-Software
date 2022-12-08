import React from 'react'
import {
    Typography,
    Button,
    SxProps,
    Theme,
    IconButton,
} from "@mui/material";
import { Auth } from '../../features/authSlice';
import LogoutButton from '../auth/LogoutButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { NavBarSX } from './Theme';


interface HeaderProps {
    auth: Auth;
    darkModeToggle: () => void;
    mode: string;
}
const Logo = () => {
    return (<Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex'},
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        marginLeft: '2.3rem',
                        marginTop: '0.5rem',
                        fontSize: 100
                    }}>
                     BASIS
    </Typography>)
}

export default function Header({ auth, darkModeToggle, mode }: HeaderProps) {
    if (auth.isAuthenticated) {
        return (
            <div>
                <div>
                {Logo()}
                </div>
                <Button
                    sx={NavBarSX}
                    id="home"
                    aria-haspopup="false"
                    href='/'>
                    Home
                </Button>
                <Button
                sx={NavBarSX}
                    id="about"
                    aria-haspopup="false"
                    href='/about'>
                    About
                </Button>
                <Button
                    sx={NavBarSX}
                    id="dashboard"
                    aria-haspopup="false"
                    href='/dashboard'>
                    Dashboard
                </Button>
                <Button
                    sx={NavBarSX}
                    id="questionnaire"
                    aria-haspopup="false"
                    href='/questionnaire'>
                    Questionnaire
                </Button>
                <Button
                    sx={NavBarSX}
                    id="filtering"
                    aria-haspopup="false"
                    href='/filtering'>
                    Filtering
                </Button>
                <LogoutButton auth={auth} />
                <IconButton sx={{ ml: 1 }} onClick={() => darkModeToggle()} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
                <hr />
            </div>
        );
    }
    else return (
        <div>
            <div>
                {Logo()}
            </div>
            <Button
                sx={NavBarSX}
                id="login"
                href='/login'>
                Login
            </Button>
            <Button
                sx={NavBarSX}
                id="register"
                href='/register'>
                Register
            </Button>
        </div>
    )
}