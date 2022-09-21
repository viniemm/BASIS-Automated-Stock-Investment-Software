import React from 'react';
import logo from '../../logo.svg';
import './Home.css';
// Refactor to class possibly
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to BASIS
        </p>
      </header>
    </div>
  );
}

export default Home;