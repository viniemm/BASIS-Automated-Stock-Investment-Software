import React, { Component } from 'react';
import { Route, Routes } from "react-router";
import { Dashboard, Home, About, Filtering } from "./pages";
import Questionnaire from './components/Questionnaire/Questionnaire'
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
=======
import Login from './components/users/Login';
import Register from './components/users/Register';
import BasisHeader from './components/layout/BasisHeader';
>>>>>>> 97eaf07 (initial navbar build)
=======
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
>>>>>>> 46459a4 (Finishing up store work for login and register)

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).

<<<<<<< HEAD
export default function App() {
  return (
    <Router>
      <div>
<<<<<<< HEAD
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
        </ul>

=======
        <BasisHeader />
>>>>>>> 97eaf07 (initial navbar build)
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
<<<<<<< HEAD
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/filtering" element={<Filtering/>}/>
=======
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
>>>>>>> 97eaf07 (initial navbar build)
        </Routes>
      </div>
    </Router>
  );
=======
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
          </Routes>
        </div>
      </Router>
      </Provider>
    );
  }
  
>>>>>>> 46459a4 (Finishing up store work for login and register)
}