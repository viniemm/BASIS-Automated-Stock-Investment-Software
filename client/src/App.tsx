import React, { Component } from 'react';
import { Route, Routes } from "react-router";
<<<<<<< HEAD
import { Dashboard, Home, About, Filtering } from "./pages";
import Questionnaire from './components/Questionnaire/Questionnaire'
=======
import { Dashboard, Home, About } from "./pages";
import Questionnaire from "./components/Questionnaire/Questionnaire";
>>>>>>> 1b64068 (Added Questionnaire to Dropdown)
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
<<<<<<< HEAD
>>>>>>> 46459a4 (Finishing up store work for login and register)
=======
import MainNavBar from './components/layout/MainNavBar';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 5972dbd (still debugging null state)
=======
import Alerts from './components/layout/Alerts';
import ProtectedRoute from './components/common/ProtectedRoute';
>>>>>>> 8447030 (lot of shit)

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
=======
import Alerts from './components/layout/Alerts';
>>>>>>> 6331330 (modified some reducersd)

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
<<<<<<< HEAD
            <Link to="/filtering">Filtering</Link>
=======
            <Link to="/questionnaire">Questionnaire</Link>
>>>>>>> 1b64068 (Added Questionnaire to Dropdown)
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
<<<<<<< HEAD
          <Route path="/filtering" element={<Filtering/>}/>
=======
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
>>>>>>> 97eaf07 (initial navbar build)
=======
          <Route path="/questionnaire" element={<Questionnaire/>}/>
>>>>>>> 1b64068 (Added Questionnaire to Dropdown)
        </Routes>
      </div>
    </Router>
  );
=======
export default class App extends Component {
  // lifecycle method
  // fires off whenever App loads
  componentDidMount() { store.dispatch(loadUser()) }

  render() {
    return (
      <Provider store={store}>
<<<<<<< HEAD
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
=======
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
>>>>>>> 5972dbd (still debugging null state)
}