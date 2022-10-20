import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPortfolios, deletePortfolio } from '../../actions/portfolios';
import portfolios from '../../reducers/portfolios';

export class Portfolios extends Component {
    static propTypes = {
        ideas: PropTypes.array.isRequired,
        getPortfolios: PropTypes.func.isRequired,
        deletePortfolio: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getPortfolios();
    }

    // needs to be formatted
    render() {
        return (
            <Fragment>
                <h2>Portfolios</h2>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Ticker</th>
                            <th>Description</th>
                            <th>Priority</th>
                            <th>Load</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.ideas.map(idea => (
                            <tr key={idea.id}>
                                <td>{idea.name}</td>
                                <td>{idea.ticker}</td>
                                <td>{idea.description}</td>
                                <td>{idea.priority}</td>
                                <td>{idea.load}</td>
                                <td><button
                                    onClick={this.props.deletePortfolio.bind(this, idea.id)}
                                    className="btn btn-danger btn-sm">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    ideas: state.ideas.ideas
});
// state.ideas => ideasReducer
// state.ideas.ideas => payload?

export default connect(mapStateToProps, { getPortfolios, deletePortfolio })
    (Portfolios);