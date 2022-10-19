import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// handle UI alerts, single Alerts component
export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        // error handling
        if (error !== prevProps.error) {
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.ticker) alert.error(`Ticker: ${error.msg.ticker.join()}`);
            if (error.msg.priority) alert.error(`Priority: ${error.msg.priority.join()}`);
            if (error.msg.load) alert.error(`Load: ${error.msg.load.join()}`);
            if (error.msg.description) alert.error(`Description: ${error.msg.description.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
            else alert.error("unknown error occured");
        }

        // message handling
        if (message !== prevProps.message) {
            if (message.deleteIdea) alert.success(message.deleteIdea);
            if (message.addIdea) alert.success(message.addIdea);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        }
    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert(Alerts));