import React, { Component, Fragment } from 'react';
import { Route, Routes } from "react-router";
import Questionnaire from "./components/questionnaire/Questionnaire";
import Questionnaire2 from "./components/questionnaire/Questionnaire2";
import Questionnaire3 from "./components/questionnaire/Questionnaire3";
import Questionnaire4 from "./components/questionnaire/Questionnaire4";
import Questionnaire5 from "./components/questionnaire/Questionnaire5";

import { Dashboard, Home, About, Filtering } from "./components";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";  // try working on using hashrouter instead of browser router 
import Login from './components/login/Login';
import Register from './components/register/Register';
import { Provider } from 'react-redux';
import store from '../src/app/store';
import { loadUser } from './features/actions/auth';
import Header from './components/layout/Header';
import Alerts from './components/layout/Alerts';
import ProtectedRoute from './components/layout/ProtectedRoute';

export default class App extends Component {
  // lifecycle method
  // fires off whenever App loads
  //componentDidMount() { store.dispatch(loadUser()) }

  render() {
    return (
      <Router>
        <Alerts />
        <Header />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/filtering" element={<Filtering />} />
            <Route path="/questionnaire" element={<Questionnaire />} />
            <Route path="/questionnaire2" element={<Questionnaire2 answers={{}} />} />
            <Route path="/questionnaire3" element={<Questionnaire3 answers={{}} />} />
            <Route path="/questionnaire4" element={<Questionnaire4 answers={{}} />} />
            <Route path="/questionnaire5" element={<Questionnaire5 answers={{}} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    );
  }
}