import React from 'react';
import { Button, Link, Card, Divider, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import { Portfolio, PortfolioDetails } from '../../features/types/Portfolio';
import { Auth } from '../../features/authSlice';
import { historicalData, userPortfolioDetails } from '../../features/services/PortfolioService';
import './Dashboard.css'
import Filtering from '../filtering/Filtering';
import { Thermostat } from '@mui/icons-material';
import { portfolioHistoricalDefaultState } from '../../filter/endpoint_constants/IndicatorsEndpointConstants';
import { ResponsiveContainer } from 'recharts';

interface DashboardState {
  userPortfolios?: Portfolio[],
  currentPortfolio?: Portfolio,
  hasPortfolios: boolean,
  auth?: Auth,
  selectedIndex?: number,
  filtering?: Filtering,
  hasGraph: boolean,
  data?: any
}

interface DashboardProps {
  auth?: Auth
}
const filterFields = (portfolioName: string) => {
  return {
  "x_axis": {
    "attribute": "date",
    "granularity": "date"
  },
  "y_axis": {
    "attribute": "closing_proportional",
    "operation": "total",
    "granularity": "1"
  },
  "breakdown": {
    "attribute": "symbol",
    "granularity": "category"
  },
  "complex_filter": {
    "logic": "and",
    "filters": [
      {
        "logic": "or",
        "filters": [
          {
            "field": "name",
            "operator": "eq",
            "value": portfolioName
          }
        ]
      }
    ]
  }
}
}
export default class Dashboard extends React.Component<DashboardProps, DashboardState> {
  state: DashboardState = {
    hasPortfolios: false,
    hasGraph: false
  };
  constructor(props: DashboardProps) {
    super(props)
    this.state.auth = this.props.auth;
    this.state.filtering = new Filtering({auth: this.state.auth as Auth})
    this.renderPortfolioDetails()
  }
  async renderPortfolioDetails() {
    if (this.state.auth) {
    const newPortfolios:PortfolioDetails = await userPortfolioDetails(this.state.auth)
    if (newPortfolios) {
        this.state.userPortfolios = newPortfolios.portfolios
        this.state.currentPortfolio = newPortfolios.portfolios[0]
        this.state.selectedIndex = 0
        this.state.hasPortfolios = true
        this.setState({hasPortfolios: true})
        this.renderCurrentGraph()
      }
  }
  }
  async renderCurrentGraph() {
    if (this.state.filtering && this.state.currentPortfolio) {
      this.state.filtering.setState({filterFields: portfolioHistoricalDefaultState})
      const newData = await historicalData(this.state.auth as Auth, this.state.currentPortfolio.name)
      if (newData) {
        this.state.filtering.setState({data: {...newData}})
      this.setState({data: {...newData}})
      this.setState({hasGraph: true})
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
            <div>
            <Card variant="outlined">
              <Typography fontSize="xl" sx={{ mb: 0.5, fontSize: 'larger', padding: '1rem'}}>
              Breakdown of your portfolio named <span className="portfolioName">{this.state.currentPortfolio?.name}</span>
              </Typography>
              </Card>
              <br></br>
              <Card variant="outlined">
              {(this.state.filtering && this.state.hasGraph) ? <div>
                <ResponsiveContainer width="95%" aspect={2.2}>
            {this.state.filtering.renderChart("area_chart", this.state.data)}
          </ResponsiveContainer>
                </div> : "Loading"}</Card>
                </div>
          </Grid>
          <Grid item xs={5}>
            <Card variant="outlined">
              <List>
                {this.state.userPortfolios?.map((tool, index, _) => {
                  if(index!=this.state.selectedIndex){ return (
                <ListItem className={index == this.state.selectedIndex ? 'highlight' : ''} key={index}>
                  <ListItemText primary={tool.name}/>
                  <Button variant="outlined" onClick={() => {
                    this.setState({currentPortfolio: tool, selectedIndex: index});
                    this.renderCurrentGraph();
                    }}>
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
            <br></br>
            <br></br>
            <div className="center-dashboard">
            <Link href="/questionnaire" underline='none'>
            <Button variant="outlined" sx={{
              fontSize: 'larger',
              borderWidth: '0.1rem',
              width: '20rem',
              height: '15rem',
              
            }}>
               Make a New Portfolio
              </Button>
              </Link>
              </div>
          </Grid>
          <Grid item xs={12}>
          </Grid>
          <Grid item xs={3} sx={{
                  '--Grid-borderWidth': '2px',
                  borderTop: 'var(--Grid-borderWidth) solid',
                  borderColor: 'divider',
                  '& > div': {
                    borderBottom: 'var(--Grid-borderWidth) solid',
                    borderColor: 'divider',
                  },
                  border: '1px dashed grey',
                  marginLeft: '3rem'
                }}>
            <div>
            <h3>Stock</h3>
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
                   {allocation.symbol} ({allocation.name})
                </ListItem>
              
              )}) : <div>N/A</div>}
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
            <h3>Weight</h3>
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
              
              )}) : <div>N/A</div>}
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
            <h3>$ Allocated</h3>
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
              )}) : <div>N/A</div>}
            </div>
          </Grid>
          <Grid item sx={{  justifyContent: 'center',alignItems: 'center', display:'flex' }} xs={4}>
            
          </Grid>
        </Grid>
      </div> : 
      <div className="center-dashboard">
        <h2>You do not have any portfolios currently</h2>
        <br></br>
        <br></br>
        <Link href="/questionnaire" underline='none'>
            <Button variant="outlined" sx={{
              fontSize: 'larger',
              borderWidth: '0.1rem',
              width: '20rem',
              height: '20rem',
            }}>
             Make a New Portfolio
            </Button>
            </Link>
            </div>
      }
      </div>
    )
  }

}