import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ChartType(props:any) {
  const {
    chartType,
    chartTypeChanged
  } = props;

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 3}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Chart Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chartType}
          label="Chart Type"
          onChange={chartTypeChanged}
        >
          <MenuItem value={"stacked_bar"}>Stacked Bar Chart</MenuItem>
          <MenuItem value={"side_by_side_bar"}>Side by Side Bar Chart</MenuItem>
          <MenuItem value={"line_chart"}>Line Chart</MenuItem>
          <MenuItem value={"area_chart"}>Area Chart</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
