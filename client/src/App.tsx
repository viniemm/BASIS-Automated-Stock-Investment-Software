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

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
      <Router>
        <div>
          <div id="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/filtering">Filtering</Link>
            </li>
            <li>
            <Link to="/questionnaire">Questionnaire</Link>
          </li>
          </ul>
          </div>
          <hr />
  
          {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/filtering" element={<Filtering/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/questionnaire" element={<Questionnaire/>}/>
          <Route path="/questionnaire2" element={<Questionnaire2 answers={{}}/>}/>
          <Route path="/questionnaire3" element={<Questionnaire3 answers={{}}/>}/>
          <Route path="/questionnaire4" element={<Questionnaire4 answers={{}}/>}/>
          <Route path="/questionnaire5" element={<Questionnaire5 answers={{}}/>}/>
          </Routes>
        </div>
      </Router>
      </Provider>
    );
  }
  
}