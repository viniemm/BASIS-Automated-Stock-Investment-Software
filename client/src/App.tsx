import React from 'react';
import { Route, Routes } from "react-router";
import { Dashboard, Home, About } from "./pages";
import Questionnaire from "./components/Questionnaire/Questionnaire";
import Questionnaire2 from "./components/Questionnaire/Questionnaire2";
import Questionnaire3 from "./components/Questionnaire/Questionnaire3";
import Questionnaire4 from "./components/Questionnaire/Questionnaire4";
import Questionnaire5 from "./components/Questionnaire/Questionnaire5";

import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).

export default function App() {
  return (
    <Router>
      <div>
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
            <Link to="/questionnaire">Questionnaire</Link>
          </li>
        </ul>

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
          <Route path="/questionnaire" element={<Questionnaire/>}/>
          <Route path="/questionnaire2" element={<Questionnaire2/>}/>
          <Route path="/questionnaire3" element={<Questionnaire3/>}/>
          <Route path="/questionnaire4" element={<Questionnaire4/>}/>
          <Route path="/questionnaire5" element={<Questionnaire5/>}/>
        </Routes>
      </div>
    </Router>
  );
}