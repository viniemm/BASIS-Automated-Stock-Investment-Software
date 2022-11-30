import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Typography,
    Button,
} from "@mui/material";
import { Auth, getUser } from '../../features/authSlice';
import LogoutButton from '../auth/LogoutButton';
import { useDispatch } from 'react-redux';
import axios, { AxiosRequestConfig } from 'axios';

interface HeaderProps {
    auth: Auth;
}

export default function Header({ auth }: HeaderProps) {
    if (auth.isAuthenticated) {
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
                    id="questionnaire"
                    aria-haspopup="false"
                    href='/questionnaire'>
                    Questionnaire
                </Button>
                <Button
                    id="filtering"
                    aria-haspopup="false"
                    href='/filtering'>
                    Filtering
                </Button>
                <LogoutButton auth={auth} />
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