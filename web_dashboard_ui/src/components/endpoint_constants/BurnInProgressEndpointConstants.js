export const burnInProgressEndpointAvailable = {
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

export const burnInProgressDefaultState = {
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
