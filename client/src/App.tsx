import React from 'react';
import { Route, Routes } from "react-router";
import { Dashboard, Home, About, Filtering } from "./pages";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Login from './components/users/Login';
import Register from './components/users/Register';
import BasisHeader from './components/layout/BasisHeader';

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).

export default function App() {
  return (
    <Router>
      <div>
        <BasisHeader />
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/filtering" element={<Filtering />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}