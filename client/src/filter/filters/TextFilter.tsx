import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import {Chip} from "@mui/material";
import {getStoredOptions} from "./CommonFilterLogic";


const arrayRemove = (arr: any[], value: any) => {
  return arr.filter(function(ele: any){
    return ele != value;
  });
}

export default function TextFilter(props: { [x: string]: any; filterAvailable: any; storedFilter: any; filterChanged: any; }) {
  const {filterAvailable, storedFilter, filterChanged} = props;
  const [optionsSelected, setOptionsSelected] = React.useState(() => {
    return getStoredOptions(storedFilter);
  });


  const handleOptionsSelectedChange = (reason: string, details: { option: any; }) => {
    let currentOptionsSelected = optionsSelected;
    if (reason === 'createOption') {
      currentOptionsSelected.push(details.option);
    } else if (reason === 'removeOption') {
      currentOptionsSelected = arrayRemove(currentOptionsSelected, details.option);
    } else if (reason === 'clear') {
      currentOptionsSelected = [];
    }
    setOptionsSelected(
      currentOptionsSelected
    );
    // Building filterAvailable
    // Finding selected fields
    interface Filters {
      field: any,
      operator: string,
      value: any
    }
    const filters:Filters[] = []
    const complexFilter = {
      logic: 'or',
      filters
    }
    currentOptionsSelected.forEach(optionFieldValue => {
      complexFilter.filters.push({
        "field": filterAvailable.field,
        "operator": "eq",
        "value": optionFieldValue
      })
    })
    filterChanged(complexFilter)
  };

  React.useEffect(() => {
      setOptionsSelected(getStoredOptions(storedFilter));
    },
    [storedFilter]
  );

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 3}}>
      <FormControl fullWidth>
        <Autocomplete
          multiple
          value={optionsSelected}
          // This line might not work
          onChange={(e:any) => handleOptionsSelectedChange(e.reason, e.details)}
          id="tags-filled"
          options={[]}
          defaultValue={[]}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              // eslint-disable-next-line react/jsx-key
              <Chip
                onClick={(e:any) => handleOptionsSelectedChange(e.reason, e.details)}
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => {
            return <TextField
              {...params}
              variant="outlined"
              label={filterAvailable.label}
              placeholder={filterAvailable.label}
            />
          }}
        />
      </FormControl>
    </Box>
  );
}