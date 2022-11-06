import { Navigate, Outlet, Route } from 'react-router-dom';
import { Auth } from '../../../features/authSlice';
import React from 'react';
import Login from '../auth/Login';

// MAKE SURE VIEW IS HIDDEN IF NOT LOGGED IN
interface ProtectedRouteProps {
  auth: Auth;
}
// need to render out component
function PrivRoute({ auth, ...rest }: ProtectedRouteProps) {

  return (
    auth.isAuthenticated ?
      <Outlet /> :
      <Navigate to='/login' />
  );
}

export default PrivRoute;
