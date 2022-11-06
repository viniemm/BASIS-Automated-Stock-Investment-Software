import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // try working on using hashrouter instead of browser router 
import Header from './components/pages/layout/Header';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import PrivRoute from './components/pages/layout/PrivRoute';
import { Home, About, Dashboard, Filtering, Login, Register } from './components/pages';

function App() {
  // lifecycle method
  // fires off whenever App loads
  //componentDidMount() { store.dispatch(loadUser()) }

  const authState = useSelector(
    (state: RootState) => state.auth
  )

  return (
    <Router>
      <Fragment>
        <Header auth={authState.auth} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<PrivRoute auth={authState.auth} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/filtering" element={<PrivRoute auth={authState.auth} />}>
            <Route path="/filtering" element={<Filtering />} />
          </Route>
          <Route path="/login" element={<Login auth={authState.auth} />} />
          <Route path="/register" element={<Register auth={authState.auth} />} />
        </Routes>
      </Fragment>
    </Router>
  );
}

export default App