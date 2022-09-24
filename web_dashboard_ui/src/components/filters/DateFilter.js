import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {Stack} from "@mui/material";
import Typography from "@mui/material/Typography";


const arrayRemove = (arr, value) => {
  return arr.filter(function(ele){
    return ele != value;
  });
}

const getStoredDates = (storedFilter) => {
  let storedDates = {
    start: null,
    end: null
  };
  if (storedFilter && 'value' in storedFilter) {
    console.log(storedFilter.value)
    storedDates = {
      start: storedFilter.value[0],
      end: storedFilter.value[1]
    }
  }
  return storedDates;
}

let endDateWasSet = false;
let startDateWasSet = false;

export default function DateFilter(props) {
  const {children, filterAvailable, storedFilter, filterChanged, ...rest} = props;
  const [storedDates, setStoredDates] = React.useState(() => {
    return getStoredDates(storedFilter);
  });

  React.useEffect(() => {
      setStoredDates(getStoredDates(storedFilter));
    },
    [storedFilter]
  );

  function handleStartTimeChange(value, keyBoardInput) {
    console.log(value)
    if (value !== 'Invalid Date') {
      if (value === null) {
        filterChanged(null);
        return;
      }
      console.log(endDateWasSet);
      startDateWasSet = true;
      let endDate = storedDates.end
      if (endDate === null || !endDateWasSet) {
        endDate = new Date();
      }
      filterChanged({
        "field": filterAvailable.field,
        "operator": "range",
        "value": [value, endDate]
      })
    }
  }

  function handleEndTimeChange(value, keyBoardInput) {
    console.log(value)
    if (value !== 'Invalid Date') {
      if (value === null) {
        filterChanged(null);
        return;
      }
      console.log(startDateWasSet);
      endDateWasSet = true;
      let startDate = storedDates.start
      if (startDate === null || !startDateWasSet) {
        startDate = new Date(new Date().getTime() - (24 * 60 * 60 * 1000));
      }
      filterChanged({
        "field": filterAvailable.field,
        "operator": "range",
        "value": [startDate, value]
      })
    }
  }

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 1}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>

        <Typography variant="b" component="div" sx={{textAlign: "center"}}>
          {filterAvailable.label}
        </Typography>
        <Stack spacing={3}>
          <DateTimePicker
            label={"Start time"}
            // inputFormat="MM/dd/yyyy"
            value={storedDates.start}
            onChange={handleStartTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
          <DateTimePicker
            label={"End time"}
            // inputFormat="MM/dd/yyyy"
            value={storedDates.end}
            onChange={handleEndTimeChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
    </Box>
  );
}