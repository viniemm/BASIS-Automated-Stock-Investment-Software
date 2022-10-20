import React, { Component, Fragment } from 'react';
import { Alert } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import errors from '../../reducers/errors';
import { deletePortfolio } from '../../actions/portfolios';
import { addPortfolioMsg, deletePortfolioMsg, passwordNotMatch } from '../../actions/message';

interface AlertProps {
    error: any,
    message: string
}

interface AlertState {
    error: Error,
    message: string
}

// handle UI alerts, single Alerts component
export class Alerts extends Component<AlertProps, AlertState> {

    componentDidUpdate(prevProps: AlertProps) {
        const { error, message } = this.props;
        // error handling: find a way to pull errors dynamically
        // by pulling error message from HTTP response
        // instead of hardcode
        if (error !== prevProps.error) {
            // error in fields  
            if (error.msg.name) return <Alert severity='error'>Name: ${error.msg.name.join()}</Alert>
            if (error.msg.non_field_errors) return <Alert severity='error'>NonField: ${error.msg.non_field_errors.join()}</Alert>         // error in non-field errors
            if (error.msg.username) return <Alert severity='error'>Username: ${error.msg.username.join()}</Alert>;                         // error in username
            else return <Alert severity='error'>Unknown Error Occurred</Alert>;
        }

        // message handling
        if (message !== prevProps.message) {
            switch (message) {
                case deletePortfolioMsg:
                case addPortfolioMsg:
                    return <Alert severity='success'>message</Alert>
                case passwordNotMatch:
                    return <Alert severity='error'>message</Alert>
            }
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state: AlertState) => ({
    error: state.error,
    message: state.message
});

export default connect(mapStateToProps)(Alerts);