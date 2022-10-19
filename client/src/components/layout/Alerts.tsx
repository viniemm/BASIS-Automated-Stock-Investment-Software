import React, { Component, Fragment } from 'react';
import { Alert } from '@mui/material';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import errors from '../../reducers/errors';

interface AlertProps {
    error: AlertState,
    message: object
}

interface AlertState {
    errors: Error,
    messages: object
}

// handle UI alerts, single Alerts component
export class Alerts extends Component<AlertProps, AlertState> {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps: AlertProps) {
        const { error, message } = this.props;
        // error handling: find a way to pull errors dynamically
        // by pulling error message from HTTP response
        // instead of hardcode
        if (error !== prevProps.error) {
            // error in fields  
            if (error.msg.name) <Alert>Name: ${error.msg.join()}</Alert>
            if (error.message.non_field_errors) alert.error(error.msg.non_field_errors.join());         // error in non-field errors
            if (error.message.username) alert.error(error.msg.username.join());                         // error in username
            else alert.error("unknown error occured");
        }

        // message handling
        if (message !== prevProps.message) {
            if (message.deletePortfolio) alert.success(message.deletePortfolio);
            if (message.addPortfolio) alert.success(message.addPortfolio);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = (state: any) => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));