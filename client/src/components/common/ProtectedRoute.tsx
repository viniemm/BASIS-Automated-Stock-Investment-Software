import React, { Component, Reducer } from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import auth from '../../reducers/auth';
import { Auth as Auth } from '../../types/User';

// MAKE SURE VIEW IS HIDDEN IF NOT LOGGED IN
interface ProtectedRouteProps {
  outlet: JSX.Element,
  auth: Auth
}

function ProtectedRoute(props: ProtectedRouteProps) {
  if (props.auth.isAuthenticated) {
    return props.outlet;
  } else if (props.auth.isLoading) {
    return <h2>Loading...</h2>
  }
  else {
    return <Navigate to={{ pathname: "/login" }} />;
  }
}


const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
