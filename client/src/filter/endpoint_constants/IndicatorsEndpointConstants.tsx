export const indicatorsEndpointAvailable = {
  label: "Stocks Indicators",
  field_value: "indicators",
  endpoint: "/api/indicators",
  filters_endpoint: "/api/indicators/filters",
  chart_type: "stacked_bar",
  properties_visible: {
    breakdown_property: true,
    x_axis_property: true,
    y_axis_property: true,
  }
};

export const indicatorsDefaultState = {
  x_axis: {
    "attribute": "year",
    "granularity": "1"
  },
  y_axis: {
    "attribute": "count",
    "operation": "count",
    "granularity": "1"
  },
  breakdown: {
    "attribute": "year",
    "granularity": "category"
  },
  complex_filter: {
    logic: "and",
    filters:[{
      logic: "or",
      filters: [
      ]
    }]
  }
};

export const portfolioHistoricalEndpointAvailable = {
  label: "Portfolio Historical Performance",
  field_value: "portfolio_historical",
  endpoint: "/api/portfolio_historical",
  filters_endpoint: "/api/portfolio_historical/filters",
  chart_type: "stacked_bar",
  properties_visible: {
    breakdown_property: true,
    x_axis_property: true,
    y_axis_property: true,
  }
};

export const portfolioHistoricalDefaultState = {
  x_axis: {
    "attribute": "symbol",
    "granularity": "category"
  },
  y_axis: {
    "attribute": "count",
    "operation": "count",
    "granularity": "1"
  },
  breakdown: {
    "attribute": "portfolio_name",
    "granularity": "category"
  },
  complex_filter: {
    logic: "and",
    filters:[{
      logic: "or",
      filters: [
      ]
    }]
  }
};
