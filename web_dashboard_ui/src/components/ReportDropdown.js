import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {MenuProps} from "./MenuProps";


export default function ReportDropdown(props) {
  const {
    children,
    reportsAvailable,
    reportChanged,
    reportState,
    ...rest
  } = props;
  const [selected, setSelected] = React.useState(() => {
    if (reportState) {
      return reportState.field_value;
    }
    return "";
  });

  const findAllOptions = (option) => {
    let optionsFound = []
    reportsAvailable.options.forEach(element => {
      if (element.field_value === option) {
        optionsFound.push(element)
      }
    })
    return optionsFound;
  };

  const handleChange = (event) => {
    setSelected(event.target.value);
    let optionsFound = findAllOptions(event.target.value);
    reportChanged(optionsFound[0]);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 3}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{reportsAvailable.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label={reportsAvailable.label}
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          {reportsAvailable.options.map((option) => (
            <MenuItem key={option.field_value} value={option.field_value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
