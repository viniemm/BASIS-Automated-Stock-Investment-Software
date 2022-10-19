import React, { Component } from 'react';
import { Route, useNavigate, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

// MAKE SURE VIEW IS HIDDEN IF NOT LOGGED IN
const navigate = useNavigate()
interface ProtectedRouteProps {
    outlet: JSX.Element,
    auth: {
        isAuthenticated: boolean,
        isLoading: boolean
    }
}

function ProtectedRoute(props: ProtectedRouteProps) {
    if(props.auth.isAuthenticated) {
      return props.outlet;
    } else if (props.auth.isLoading) {
        return <h2>Loading...</h2>
    }
    else  {
      return <Navigate to={{ pathname: "/login" }} />;
    }
  }
  

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
