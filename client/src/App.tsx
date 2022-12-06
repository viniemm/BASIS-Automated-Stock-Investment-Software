import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // try working on using hashrouter instead of browser router 
import Header from './components/layout/Header';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import axios, { AxiosRequestConfig } from 'axios';
import { getUser, unloadUser } from './features/authSlice';
import ComponentRoutes from './components/layout/ComponentRoutes';

function App() {
  const dispatch = useDispatch();

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

  return (
    <Router>
      <Fragment>
        <Header auth={authState} />
        <ComponentRoutes auth={authState} />
      </Fragment>
    </Router>
  );
}

export default App