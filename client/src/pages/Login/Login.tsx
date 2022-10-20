import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { UserSessionProps } from '../../components/layout/MainNavBar';

interface LoginState {
    username: string,
    password: string
}

interface LoginProps {
    login: (username: string, password: string) => void,
    isAuthenticated: boolean
}

//const LoginFormView = (
//<div className="App">
//    <form className="form">
//      <CustomInput
//        labelText="Email"
//        id="email"
//        formControlProps={{
//          fullWidth: true
//        }}
//        handleChange={this.handleChange}
//        type="text"
//      />
//      <CustomInput
//        labelText="Password"
//        id="password"
//        formControlProps={{
//          fullWidth: true
//        }}
//        handleChange={this.handleChange}
//        type="password"
//      />
//
//      <Button type="button" color="primary" className="form__custom-button">
//        Log in
//      </Button>
//    </form>
//  </div>
//)

export class Login extends Component<LoginProps, LoginState> {
    state = {
        username: '',
        password: ''
    };

    onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    // typescript conversion of: this.setState({ [e.target.name]: e.target.value })
    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const field: "username" | "password" = event.target.name as "username" | "password";
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[field] = event.target.value;
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Navigate to={{ pathname: "/" }} />;
        }
        const { username, password } = this.state;
        return (    // needs to be converted to MUI
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
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
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                        <p>
                            Don&apos;t have an account? <Link to="/register">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: UserSessionProps) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);