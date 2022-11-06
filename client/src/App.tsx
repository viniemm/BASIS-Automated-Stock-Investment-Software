import { Component } from 'react';
import { BrowserRouter as Router } from "react-router-dom";  // try working on using hashrouter instead of browser router 
import Header from './components/pages/layout/Header';
import Alerts from './components/pages/layout/Alerts';
import BasisRoutes from './components/pages/layout/BasisRoutes';
import { useSelector } from 'react-redux';
import { startOfDecade } from 'date-fns/esm';
import { RootState } from './app/store';

export default function App() {
  // lifecycle method
  // fires off whenever App loads
  //componentDidMount() { store.dispatch(loadUser()) }

  const authState = useSelector(
    (state: RootState) => state.auth
  )

  return (
    <Router>
      <Alerts />
      <Header authState={authState.auth} />
      <div className='container'>
        <BasisRoutes authState={authState.auth} />
      </div>
    </Router>
  );
}