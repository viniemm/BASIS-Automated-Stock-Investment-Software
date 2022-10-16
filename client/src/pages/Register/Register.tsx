import React, { Component } from 'react';
<<<<<<< HEAD
<<<<<<<< HEAD:client/src/components/users/Register.tsx
import { Link, useNavigate } from 'react-router-dom';
========
import { Link, Navigate } from 'react-router-dom';
>>>>>>>> 46459a4 (Finishing up store work for login and register):client/src/pages/Register/Register.tsx
=======
import { Link, Navigate } from 'react-router-dom';

>>>>>>> 5972dbd (still debugging null state)
import { connect } from 'react-redux';
import { register } from '../../actions/auth';
import { createMessage, passwordNotMatch } from '../../actions/message';

<<<<<<<< HEAD:client/src/components/users/Register.tsx

interface RegisterProps {
    register: Function,
    isAuthenticated: boolean
}

========
>>>>>>>> 46459a4 (Finishing up store work for login and register):client/src/pages/Register/Register.tsx
interface RegisterState {
    username: string,
    email: string,
    password: string,
    password2: string
}

<<<<<<<< HEAD:client/src/components/users/Register.tsx

========
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
>>>>>>>> 46459a4 (Finishing up store work for login and register):client/src/pages/Register/Register.tsx
export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    };


    onSubmit = (event: any) => {
        event.preventDefault();
        const { username, email, password, password2 } = this.state;
        if (password !== password2) {
            this.props.createMessage(passwordNotMatch);
        } else {
            const newUser = {
                username,
                password,
                email
            };
            this.props.register(newUser);
        }
    };

<<<<<<<< HEAD:client/src/components/users/Register.tsx
    // typescript conversion of: this.setState({ [e.target.name]: e.target.value })
    onChange = (event: any) => {
        const field: "username" | "password" = event.target.name as "username" | "password";
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[field] = event.target.value;
    };

    render() {
        if (this.props.isAuthenticated) { // login user, redirect user to main page
<<<<<<< HEAD
            this.navigate("/")
========
    onChange = (e: any) => {
        const field:"username"|"password" = e.target.name as "username"|"password";
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[field] = e.target.value;
    }

    render() {
        if (this.props.isAuthenticated) { // login user, redirect user to main page
            return <Navigate to={{ pathname: "/login" }} />;
>>>>>>>> 46459a4 (Finishing up store work for login and register):client/src/pages/Register/Register.tsx
=======
            return <Navigate to={{ pathname: "/" }} />;
>>>>>>> 5972dbd (still debugging null state)
        }
        const { username, email, password, password2 } = this.state;
        return (    // needs to be converted to MUI component!
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