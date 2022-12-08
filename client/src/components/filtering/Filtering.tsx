import './Filtering.css';
import React, { Component, Fragment } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer, Label, Area, AreaChart, Line, LineChart } from 'recharts';
import axios, { AxiosRequestConfig, CancelTokenSource } from "axios";
import randomColor from "randomcolor";
import '@progress/kendo-theme-default/dist/all.css';
import PersistentDrawerLeft from '../../filter/PersistentDrawer';
import {
  indicatorsDefaultState,
  indicatorsEndpointAvailable, portfolioHistoricalDefaultState, portfolioHistoricalEndpointAvailable
} from '../../filter/endpoint_constants/IndicatorsEndpointConstants';
import TransitionAlert from '../../filter/TransitionAlert';
import { FilteringProps, FilteringState } from '../../filter/models/Models';
import { Auth } from '../../features/authSlice';


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
    generated_colors = generated_colors.concat(randomColor({ seed: 34564, luminosity: 'dark', count: colorCount - generated_colors.length + 1 }));
  }
  return generated_colors;
}

const reportsAvailable = {
  label: "Select Report",
  options: [
    indicatorsEndpointAvailable,
    portfolioHistoricalEndpointAvailable
  ]
}

const defaultFilterFields = new Map([
  ["indicators", indicatorsDefaultState],
  ["portfolio_historical", portfolioHistoricalDefaultState]
]);


class Filtering extends Component<FilteringProps, FilteringState> {
  updateTimer: NodeJS.Timeout | null;
  cancelTokenSource: CancelTokenSource;
  authentication: Auth;

  constructor(props: FilteringProps) {
    super(props);
    this.updateTimer = null;
    this.authentication = props.auth;
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
    this.filtersChanged = this.filtersChanged.bind(this);
    this.reportChanged = this.reportChanged.bind(this);
    this.chartTypeChanged = this.chartTypeChanged.bind(this);
    this.setErrorOpen = this.setErrorOpen.bind(this);
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

  // authenticate upon refresh
  refreshGraphData = () => {
    console.log("Refreshing Graph Data")
    this.setState({
      processingRequest: true
    });
    this.updateTimer = null;
    this.cancelTokenSource = axios.CancelToken.source();

    // potentially unnecessary check
    if (this.authentication.token !== null) {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.authentication.token}`
        },
        cancelToken: this.cancelTokenSource.token
      };
      const filterFieldsSerialized = JSON.stringify(this.state.filterFields)
      axios.post(this.state.reportState.endpoint, filterFieldsSerialized, config)
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
          this.handleBadReturn(err.stack);
        });
    }
    else {
      console.log("not authenticated")
    }
  };

  // authenticate upon retrieval
  getAvailableFilters = () => {
    console.log("Requesting Available Filters")
    // potentially unnecessary check
    if (this.authentication.token !== null && !this.authentication.isAuthenticated) {
      const config: AxiosRequestConfig = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${this.authentication.token}`
        }
      }
      const body = ""

      axios.post(this.state.reportState.filters_endpoint, body, config)
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
          this.handleBadReturn(err.stack);
        });
    }
    else {
      console.log("not authenticated")
    }
  };

  scheduleRefreshGraphData = () => {
    if (this.updateTimer == null) {
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

  renderLineChart = (data?: any) => {
    if (!data) {
      data = this.state.data
    }
    let colorCount = 0;
    console.log(`DATA?: ${data.data_keys}`)
    const chart = data.data_keys.map((value: any) => (
      <Line
        connectNulls
        type="monotone"
        key={value}
        dataKey={value}
        stroke={getRandomColorList(data.data_keys.length)[colorCount++]}
      />
    ));
    return chart;
  }

  renderAreaChart = (data?: any) => {
    let colorCount = 0;
    if (!data) {
      data = this.state.data
    }
    const chart = data.data_keys.map((value: any) => (
      <Area
        connectNulls
        type="monotone"
        stackId="a"
        key={value}
        dataKey={value}
        stroke={getRandomColorList(data.data_keys.length)[colorCount]}
        fill={getRandomColorList(data.data_keys.length)[colorCount++]}
      />
    ));
    return chart;
  }

  renderBarCharts(chartType: string) {
    if (chartType === "stacked_bar") {
      return this.renderStackedBars();
    }
    if (chartType === "side_by_side_bar") {
      return this.renderSideBySideBars();
    }
  }

  renderLineCharts(chartType: string, data?: any) {
    if (chartType === "line_chart") {
      console.log("HERE")
      return this.renderLineChart(data);
    }
  }

  renderChart(chartType: string, data?: any): any {
    if (chartType === "stacked_bar" || chartType === "side_by_side_bar") {
      return (
        <BarChart data={this.state.data.data_points}>
          <CartesianGrid />
          <XAxis dataKey={this.state.data.x_axis.attribute} dy={40} height={120}>
            <Label value={this.state.data.x_axis.label} dy={40} />
          </XAxis>
          <YAxis>
            <Label value={this.state.data.y_axis.label} dx={-10} angle={-90} />
          </YAxis>
          <Tooltip />
          <Legend dy={170} />
          {this.renderBarCharts(this.state.chartType)}
        </BarChart>
      )
    }
    if (chartType === "line_chart") {
      if (!data) {
        data = this.state.data
      }
      console.log(data)
      return <LineChart data={data.data_points}>
        <XAxis dataKey={data.x_axis.attribute} dy={40} height={120}>
          <Label value={data.x_axis.label} dy={40} />
        </XAxis>
        <YAxis>
          <Label value={data.y_axis.label} dx={-10} angle={-90} />
        </YAxis>
        <Tooltip />
        <Legend dy={170} />
        {this.renderLineCharts(chartType, data)}
      </LineChart>
    }
    if (chartType === "area_chart") {
      if (!data) {
        data = this.state.data
      }
      return <AreaChart data={data.data_points}>
        <XAxis dataKey={data.x_axis.attribute} dy={40} height={120}>
          <Label value={data.x_axis.label} dy={40} />
        </XAxis>
        <YAxis>
          <Label value={data.y_axis.label} dx={-10} angle={-90} />
        </YAxis>
        <Tooltip />
        <Legend dy={170} />
        {this.renderAreaChart(data)}
      </AreaChart>
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

  chartTypeChanged(event: any) {
    this.setState({
      chartType: event.target.value
    });
  }

  render() {
    return (
      <Fragment>
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
          {this.state.error && <TransitionAlert text={this.state.error} open={this.state.open} setOpen={this.setErrorOpen} />}
          <ResponsiveContainer width="95%" aspect={2.2}>
            {this.renderChart(this.state.chartType)}
          </ResponsiveContainer>
        </PersistentDrawerLeft>
      </Fragment>
    );
  }
}

export default Filtering;
