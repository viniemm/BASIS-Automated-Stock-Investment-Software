import React, { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

interface LoginState {
    username: string,
    password: string
}

interface LoginProps {
    login: (username: string, password: string) => void;
    isAuthenticated: boolean
}

export class Login extends Component<LoginProps, LoginState> {
    state = {
        username: '',
        password: ''
    };

    onSubmit = (e: any) => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    };

    onChange = (e: any) => {
        const field: "username" | "password" = e.target.name as "username" | "password";
        // eslint-disable-next-line react/no-direct-mutation-state
        this.state[field] = e.target.value;
    }
    navigate = useNavigate();
    render() {
        if (this.props.isAuthenticated) {
            this.navigate("/")
        }
        const { username, password } = this.state;
        return (
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

const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);