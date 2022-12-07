import React, { Component, Fragment } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // try working on using hashrouter instead of browser router 
import Header from './components/layout/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import axios, { AxiosRequestConfig } from 'axios';
import { getUser, unloadUser } from './features/authSlice';
import ComponentRoutes from './components/layout/ComponentRoutes';
import { COLORS, getDesignTokens } from './components/layout/Theme';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { Global } from '@emotion/react';


// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const dispatch = useDispatch();
  const GlobalStyle = createGlobalStyle`
  body {
    color: ${COLORS.greenPrimary};
    background-color: ${COLORS.dark};
  }
`

  const authState = useSelector(
    (state: RootState) => state.auth.auth
  );

  if (authState.token !== null && !authState.isAuthenticated) {
    const config: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${authState.token}`
      }
    };

    axios.get('/api/auth/user', config)
      .then(response => {
        dispatch(getUser(response.data));
      })
      .catch(error => {
        console.log(error);
        dispatch(unloadUser(error))
      });
  }
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  const theme = React.useMemo(
    () =>
    createTheme(getDesignTokens(mode)),
    [mode],
  )


  return (
    <MuiThemeProvider theme={theme}>
    <Router>
      <Fragment>
        <CssBaseline/>
        <Header darkModeToggle={colorMode.toggleColorMode} mode={mode} auth={authState} />
        <ComponentRoutes auth={authState} />
      </Fragment>
    </Router>
    </MuiThemeProvider>
  );
}

export default App