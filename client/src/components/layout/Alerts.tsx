import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
<<<<<<< HEAD

// handle UI alerts, single Alerts component
export class Alerts extends Component {
    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }
=======
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
>>>>>>> 04049e5 (committed uncommitted changes from last commit)

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        // error handling
        if (error !== prevProps.error) {
<<<<<<< HEAD
            if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
            if (error.msg.ticker) alert.error(`Ticker: ${error.msg.ticker.join()}`);
            if (error.msg.priority) alert.error(`Priority: ${error.msg.priority.join()}`);
            if (error.msg.load) alert.error(`Load: ${error.msg.load.join()}`);
            if (error.msg.description) alert.error(`Description: ${error.msg.description.join()}`);
            if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            if (error.msg.username) alert.error(error.msg.username.join());
            else alert.error("unknown error occured");
=======
            // error in fields  
            if (error.msg.name) return <Alert severity='error'>Name: ${error.msg.name.join()}</Alert>
            if (error.msg.non_field_errors) return <Alert severity='error'>NonField: ${error.msg.non_field_errors.join()}</Alert>         // error in non-field errors
            if (error.msg.username) return <Alert severity='error'>Username: ${error.msg.username.join()}</Alert>;                         // error in username
            else return <Alert severity='error'>Unknown Error Occurred</Alert>;
>>>>>>> 04049e5 (committed uncommitted changes from last commit)
        }

        // message handling
        if (message !== prevProps.message) {
<<<<<<< HEAD
            if (message.deleteIdea) alert.success(message.deleteIdea);
            if (message.addIdea) alert.success(message.addIdea);
            if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
=======
            switch (message) {
                case deletePortfolioMsg:
                case addPortfolioMsg:
                    return <Alert severity='success'>message</Alert>
                case passwordNotMatch:
                    return <Alert severity='error'>message</Alert>
            }
>>>>>>> 04049e5 (committed uncommitted changes from last commit)
        }
    }

    render() {
        return <Fragment />;
    }
}

<<<<<<< HEAD
const mapStateToProps = state => ({
    error: state.errors,
    message: state.messages
=======
const mapStateToProps = (state: AlertState) => ({
    error: state.error,
    message: state.message
>>>>>>> 04049e5 (committed uncommitted changes from last commit)
});

export default connect(mapStateToProps)(Alerts);