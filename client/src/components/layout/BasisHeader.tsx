import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { AnyIfEmpty, connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

interface UserSessionProps {
    auth: UserSessionState,
    logout: React.MouseEventHandler<HTMLButtonElement>
};

interface UserSessionState {
    isAuthenticated: boolean,
    user: any
}


// Navigation Bar for client web app
export class BasisHeader extends Component<UserSessionProps, UserSessionState> {

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <span className='navbar-text mr-3'>
                    <strong>
                        {this.state.user ? `Welcome ${this.state.user.username}` : ""}
                    </strong>
                </span>
                <li className='nav-item'>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/about' className='nav-link'>About</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/dashboard' className='nav-link'>Dashboard</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/filtering' className='nav-link'>Filtering</Link>
                </li>
                <li className='nav-item'>
                    <button className='nav-link btn btn-info btn-sm text-light' onClick={this.props.logout}>
                        Logout
                    </button>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className='nav-item'>
                    <Link to='/' className='nav-link'>Home</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/about' className='nav-link'>About</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/register' className='nav-link'>Register</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/login' className='nav-link'>Login</Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm bg-light">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">BASIS</a>
                    </div>
                    {this.state.isAuthenticated ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(BasisHeader);