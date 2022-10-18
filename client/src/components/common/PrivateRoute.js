import React from 'react';
import { Route, redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// MAKE SURE VIEW IS HIDDEN IF NOT LOGGED IN
const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (auth.isLoading) {
                return <h2>Loading...</h2>
            } else if (!auth.isAuthenticated) {
                return <redirect to='/login' />;
            }
            else {
                return <Component {...props} />;
            }
        }}
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
