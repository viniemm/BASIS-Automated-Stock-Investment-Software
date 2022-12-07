import React from 'react';
import { Box, Button, Card, Container, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Portfolio, PortfolioDetails } from '../../features/types/Portfolio';
import { Auth } from '../../features/authSlice';
import { userPortfolioDetails } from '../../features/services/PortfolioService';
import './Dashboard.css'

interface DashboardState {
  userPortfolios?: Portfolio[],
  currentPortfolio?: Portfolio,
  hasPortfolios: boolean,
  auth?: Auth,
  selectedIndex?: number
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
        this.state.selectedIndex = 0
        this.setState({hasPortfolios: true})
        this.state.hasPortfolios = true
        console.log(this.state)
      }
  }
}

async generate(element: React.ReactElement) {
  if(this.state.auth){
    if(this.state.userPortfolios){
      return this.state.userPortfolios.map((value) =>
        React.cloneElement(element, {
        key: value as any,
      }),
    );}
  }
}
  render() {
    return (
      <div className="Dashboard">
      {
        this.state.hasPortfolios ? <div>
        <h2>Dashboard</h2>
        <Grid container spacing={5}>
          <Grid item xs={7}>
            <Card variant="outlined">
              <Typography fontSize="xl" sx={{ mb: 0.5 }}>
              Current portfolio name: {this.state.currentPortfolio?.name}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card variant="outlined">
              <List>
                {this.state.userPortfolios?.map((tool, index, _) => {
                  if(index!=this.state.selectedIndex){ return (
                <ListItem className={index == this.state.selectedIndex ? 'highlight' : ''} key={index}>
                  <ListItemText primary={tool.name}/>
                  <Button onClick={() => { this.setState({currentPortfolio: tool, selectedIndex: index}); }}>
                    Select
                  </Button>
                </ListItem>
                );}
                else{ return(
                  <ListItem className={index == this.state.selectedIndex ? 'highlight' : ''} key={index}>
                    <ListItemText primary={tool.name}/>
                  </ListItem>
                );
                }
                })}
              </List>
            </Card>
          </Grid>
          <Grid item xs={8}>
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined">
                <Link to="/questionnaire"> Make a New Portfolio </Link>
              </Button>
          </Grid>
        </Grid>
      </div> : <div>
      <Button variant="outlined">
        <Link to="/questionnaire"> Make a New Portfolio </Link>
      </Button>
      </div>
      }
      </div>
    )
  }

}