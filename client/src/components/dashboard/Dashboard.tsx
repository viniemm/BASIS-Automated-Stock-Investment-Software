import React from 'react';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Portfolio, PortfolioDetails } from '../../features/types/Portfolio';
import { Auth } from '../../features/authSlice';
import { userPortfolioDetails } from '../../features/services/PortfolioService';

interface DashboardState {
  userPortfolios?: Portfolio[],
  currentPortfolio?: Portfolio,
  hasPortfolios: boolean,
  auth?: Auth
}

interface DashboardProps {
  auth?: Auth
}
export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state: DashboardState = {
    hasPortfolios: false
  };
  constructor(props: DashboardProps) {
    super(props)
    this.state.auth = this.props.auth;
    this.portfolioDetails()
  }
  async portfolioDetails() {
    if (this.state.auth) {
    const newPortfolios:PortfolioDetails = await userPortfolioDetails(this.state.auth)
    console.log(newPortfolios)
      if (newPortfolios) {
        this.state.userPortfolios = newPortfolios.portfolios
        this.state.currentPortfolio = newPortfolios.portfolios[0]
        this.setState({hasPortfolios: true})
      }
     console.log(this.state)
  }
}
  render() {
    return (
      <div>
      {
        this.state.hasPortfolios ? <div>
        <h2>Dashboard</h2>
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Card variant="outlined">
              <Typography fontSize="xl" sx={{ mb: 0.5 }}>
              Current portfolio name: {this.state.currentPortfolio?.name}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            
          </Grid>
          <Grid item xs={8}>
            
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined">
                <Link to="/questionnaire"> Make a New Portfolio </Link>
            </Button>
          </Grid>
        </Grid>
      </div> : <Button variant="outlined">
                <Link to="/questionnaire"> Make a New Portfolio </Link>
            </Button>
      }
      </div>
    )
  }

}