import React, { Component } from 'react';
import { Route, Routes } from "react-router";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Questionnaire2 from "./components/Questionnaire/Questionnaire2";
import Questionnaire3 from "./components/Questionnaire/Questionnaire3";
import Questionnaire4 from "./components/Questionnaire/Questionnaire4";
import Questionnaire5 from "./components/Questionnaire/Questionnaire5";

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
  componentDidMount() { store.dispatch(loadUser()) }

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
              <Route path="/questionnaire" element={<Questionnaire />} />
              <Route path="/questionnaire2" element={<Questionnaire2 answers={{}} />} />
              <Route path="/questionnaire3" element={<Questionnaire3 answers={{}} />} />
              <Route path="/questionnaire4" element={<Questionnaire4 answers={{}} />} />
              <Route path="/questionnaire5" element={<Questionnaire5 answers={{}} />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    );
  }
}