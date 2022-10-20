import React, { Component } from 'react';
import { Route, Routes } from "react-router";
import { Dashboard, Home, About, Filtering } from "./pages";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import MainNavBar from './components/layout/MainNavBar';
import Alerts from './components/layout/Alerts';
import ProtectedRoute from './components/common/ProtectedRoute';

export default class App extends Component {
  // lifecycle method
  // fires off whenever App loads
  componentDidMount() { store.dispatch(loadUser()) };

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainNavBar />
          <Alerts />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/filtering" element={<Filtering />} />
            </Routes>
            <Home />
          </div>
        </Router>
      </Provider>
    );
  }
}