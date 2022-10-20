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

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).

export default class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MainNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/filtering" element={<Filtering />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </Provider>
    );
  }
}