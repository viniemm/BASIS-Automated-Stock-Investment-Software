import './Filtering.css';
import React, { Component } from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label} from 'recharts';
import axios from "axios";
import randomColor from "randomcolor";
import '@progress/kendo-theme-default/dist/all.css';
import PersistentDrawerLeft from '../../components/Filter/PersistentDrawer';
import {
  indicatorsDefaultState,
  indicatorsEndpointAvailable
} from '../../components/Filter/endpoint_constants/IndicatorsEndpointConstants';
import TransitionAlert from '../../components/Filter/TransitionAlert';


const getRandomColorList = (colorCount: number) => {
  let generated_colors = [
    "#673ab7", "#00bcd4", "#cddc39",
    "#8d6e63", "#d81b60", "#618833", "#b26a00",
    "#2196f3", "#d84315", "#ffc107",
    "#2c387e", "#4e342e", "#b2a429",
    "#6d1b7b", "#03a9f4", "#8bc34a", "#ef6c00",
    "#1769aa", "#2e7d32", "#b28704",
    "#3f51b5", "#009688", "#ffeb3b",
  ];
  if (colorCount >= generated_colors.length) {
    generated_colors = generated_colors.concat(randomColor({seed: 34564, luminosity: 'dark', count: colorCount - generated_colors.length + 1}));
  }
  return generated_colors;
}

const reportsAvailable = {
  label: "Select Report",
  options: [
    indicatorsEndpointAvailable
  ]
}

const defaultFilterFields = new Map([
  ["indicators", indicatorsDefaultState]
])

interface FilteringState {
  processingRequest: boolean,
  chartType: string,
  errorOpen: boolean,
  error: any,
  reportState: any,
  filtersAvailable: any,
  filterFields:any,
  data: any,
  open?: any
}

class Filtering extends Component<any, FilteringState> {
  updateTimer: any;
  cancelTokenSource: any;

  constructor(props: Record<string, unknown> | Readonly<unknown>) {
    super(props);
    this.updateTimer = null;
    this.cancelTokenSource = axios.CancelToken.source();
    this.state = {
      processingRequest: false,
      chartType: "stacked_bar",
      errorOpen: true,
      error: null,
      reportState: reportsAvailable.options[0],
      filtersAvailable: {
        x_axis: [],
        y_axis: [],
        breakdown: [],
        filters: []
      },
      filterFields: defaultFilterFields.get(reportsAvailable.options[0].field_value),
      data: {
        x_axis: {},
        y_axis: {},
        details: {},
        data_keys: [],
        data_points: []
      }
    };
    // Binding state to dropdown changed function
    this.filtersChanged=this.filtersChanged.bind(this);
    this.reportChanged=this.reportChanged.bind(this);
    this.chartTypeChanged=this.chartTypeChanged.bind(this);
    this.setErrorOpen=this.setErrorOpen.bind(this);
  }

  componentDidMount() {
    this.scheduleRefreshGraphData();
    this.getAvailableFilters();
    // Periodic update
    // TODO: allow change the value of the periodic update
    setInterval(this.refreshAll, 300000);
  }

  setErrorOpen(open: any) {
    console.log("Set error open called")
    this.setState({
      open: open
    })
  }

  handleBadReturn(err: string) {
    console.log("Error Handler Called")
    console.log(err)
    this.setState({
      error: err,
      open: true
    })
  }

  refreshGraphData = () => {
    console.log("Refreshing Graph Data")
    this.setState({
      processingRequest: true
    });
    this.updateTimer = null;
    this.cancelTokenSource = axios.CancelToken.source();
    axios.post(this.state.reportState.endpoint, JSON.stringify(this.state.filterFields), {
        cancelToken: this.cancelTokenSource.token
      })
      .then((res) => {
        if (res.status !== 200) {
          this.handleBadReturn(res.statusText);
        } else {
          this.setState({
            processingRequest: false,
            data: res.data
          })
        }
      })
      .catch((err) => {
        console.log(err);
        this.handleBadReturn(err.message + ": " + err.response.data);
      });
  };

  getAvailableFilters = () => {
    console.log("Requesting Available Filters")
    axios
      .post(this.state.reportState.filters_endpoint, "")
      .then((res) => {
        if (res.status !== 200) {
          this.handleBadReturn(res.statusText);
        } else {
          const endpoint_return = res.data;
          this.setState({
            filtersAvailable: structuredClone(endpoint_return)
          })
        }
      })
      .catch((err) => {
        console.log(err);
        this.handleBadReturn(err.message + ": " + err.response.data);
      });
  };

  scheduleRefreshGraphData = () => {
    if(this.updateTimer == null) {
      this.cancelTokenSource.cancel();
      this.updateTimer = setTimeout(this.refreshGraphData, 500);
    }
  }

  refreshAll = () => {
    this.getAvailableFilters();
    this.scheduleRefreshGraphData();
  }

  renderStackedBars = () => {
    let colorCount = 0;
    const bars = this.state.data.data_keys.map((value: any) => (
      <Bar
        key={value}
        dataKey={value}
        stackId="a"
        fill={getRandomColorList(this.state.data.data_keys.length)[colorCount++]}
      />
    ));
    return bars;
  }

  renderSideBySideBars = () => {
    let colorCount = 0;
    const bars = this.state.data.data_keys.map((value: any) => (
      <Bar
        key={value}
        dataKey={value}
        fill={getRandomColorList(this.state.data.data_keys.length)[colorCount++]}
      />
    ));
    return bars;
  }

  renderChart(chartType: string) {
    if (chartType === "stacked_bar") {
      return this.renderStackedBars();
    }
    if (chartType === "side_by_side_bar") {
      return this.renderSideBySideBars();
    }
  }

  filtersChanged(filter: { x_axis: any; y_axis: any; breakdown: any; complex_filter: any; }) {
    console.log("Changing Filters")
    console.log(filter);
    const filterFields = this.state.filterFields;
    if ('x_axis' in filter) {
      filterFields.x_axis = filter.x_axis;
    }
    if ('y_axis' in filter) {
      filterFields.y_axis = filter.y_axis;
    }
    if ('breakdown' in filter) {
      filterFields.breakdown = filter.breakdown;
    }
    if ('complex_filter' in filter) {
      filterFields.complex_filter = filter.complex_filter;
    }
    this.setState({
      filterFields: filterFields
    }, () => {
      this.scheduleRefreshGraphData();
    });
  }

  reportChanged(newReport: { field_value: string; }) {
    this.setState({
      reportState: newReport,
      filterFields: defaultFilterFields.get(newReport.field_value)
    }, () => {
      console.log("Report Changed");
      console.log(this.state.filterFields);
      console.log(this.state.reportState);
      this.setState({
        chartType: this.state.reportState.chart_type
      });
      this.refreshAll();
    });
  }

  chartTypeChanged(event:any) {
    this.setState({
      chartType: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <PersistentDrawerLeft
          loading={this.state.processingRequest}
          chartType={this.state.chartType}
          chartTypeChanged={this.chartTypeChanged}
          reportsAvailable={reportsAvailable}
          reportChanged={this.reportChanged}
          reportState={this.state.reportState}
          filtersAvailable={this.state.filtersAvailable}
          filtersChanged={this.filtersChanged}
          filterState={this.state.filterFields}
        >
          {this.state.error && <TransitionAlert text={this.state.error} open={this.state.open} setOpen={this.setErrorOpen}/>}
          <ResponsiveContainer width="95%" aspect={2.2}>
            <BarChart data={this.state.data.data_points}>
              <CartesianGrid />
              <XAxis dataKey={this.state.data.x_axis.attribute} dy={40} height={120}>
                <Label value={this.state.data.x_axis.label} dy={40} />
              </XAxis>
              <YAxis>
                <Label value={this.state.data.y_axis.label} dx={-10} angle={-90}/>
              </YAxis>
              <Tooltip />
              <Legend  dy={170}/>
              {this.renderChart(this.state.chartType)}
            </BarChart>
          </ResponsiveContainer>
        </PersistentDrawerLeft>
      </div>
    );
  }
}

export default Filtering;
