import React from 'react';
import { Button, Card, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
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
    this.renderPortfolioDetails()
  }
  async renderPortfolioDetails() {
    if (this.state.auth) {
    const newPortfolios:PortfolioDetails = await userPortfolioDetails(this.state.auth)
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
                  <Button variant="outlined" onClick={() => { this.setState({currentPortfolio: tool, selectedIndex: index}); }}>
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
          <Grid item xs={12}>
          <h1>Breakdown</h1>
          </Grid>
          <Grid item xs={2} sx={{
                  '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  },
                  border: '1px dashed grey'
                }}>
            <div>
            <h2>Stock</h2>
            <Divider />
            {this.state.currentPortfolio ? this.state.currentPortfolio.allocations.map((allocation, index, _) => {
              return (
                <ListItem key={index} sx={{
                  '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider'
                  },
                }}>
                   {allocation.symbol}
                </ListItem>
              
              )}) : <div>Hi</div>}
            </div>
          </Grid>
          <Grid item xs={2} sx={{ '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  },
                  p: 2, border: '1px dashed grey' }}>
          <div>
            <h2>Weight</h2>
            <Divider />
            {this.state.currentPortfolio ? this.state.currentPortfolio.allocations.map((allocation, index, _) => {
              return (
                <ListItem key={index}sx={{
                  '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  },
                }}>
                   {allocation.allocation}
                </ListItem>
              
              )}) : <div>Hi</div>}
            </div>
          </Grid>
          <Grid item xs={2.5} sx={{ '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  }, p: 2, border: '1px dashed grey' }}>
          <div>
            <h2>$ Allocated</h2>
            <Divider />
            {this.state.currentPortfolio ? this.state.currentPortfolio.allocations.map((allocation, index, _) => {
              return (
                <ListItem key={index}sx={{
                  '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  },
                }}>
                   {this.state.currentPortfolio ? allocation.allocation * this.state.currentPortfolio.value : -1}
                </ListItem>
              )}) : <div>Hi</div>}
            </div>
          </Grid>
          <Grid item xs={1.5}>
            
          </Grid>
          <Grid item xs={4}>
            <Button variant="outlined">
                <Link to="/questionnaire"> Make a New Portfolio </Link>
              </Button>
          </Grid>
        </Grid>
      </div> : 
      <div>
        <h3>You do not have any portfolios currently</h3>
            <Button variant="outlined" size="large">
                <Link to="/questionnaire"> Make a New Portfolio </Link>
            </Button>
            </div>
      }
      </div>
    )
  }

}