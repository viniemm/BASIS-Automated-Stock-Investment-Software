import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage } from '../../actions/messages';

interface RegisterState {
    username: string,
    email: string,
    password: string,
    password2: string
}

interface NewUser {
    username: string,
    password: string,
    email: string
}

interface RegisterProps {
    register: (newUser: NewUser) => void,
    isAuthenticated: boolean,
    createMessage: (msg: any) => void
}
export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };


    onSubmit = (e: any) => {
        e.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage({ passwordNotMatch: 'Passwords do not match' });
        } else {
            const newUser = {
                username,
                password,
                email
            };
            this.props.register(newUser);
        }
    };

    onChange = (e: any) => {
        const field:"username"|"password" = e.target.name as "username"|"password";
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[field] = e.target.value;
    }

    render() {
        if (this.props.isAuthenticated) { // login user, redirect user to main page
            return <Navigate to={{ pathname: "/login" }} />;
        }
        const { username, email, password, password2 } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Register</h2>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                onChange={this.onChange}
                                value={username}
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                onChange={this.onChange}
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                onChange={this.onChange}
                                value={password}
                            />
                        </div>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password2"
                                onChange={this.onChange}
                                value={password2}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register, createMessage })(Register);