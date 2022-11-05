/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Checkbox, Chip } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import { MenuProps } from "../MenuProps";
import { getStoredOptions } from "./CommonFilterLogic";
import { CategoryFilterProps } from '../../../types/StateModels';
import { Filter } from '../../../types/StateModels';


export default function CategoryFilter(props: CategoryFilterProps) {
  const { filterAvailable, storedFilter, filterChanged } = props;
  const [optionsSelected, setOptionsSelected] = React.useState(() => {
    return getStoredOptions(storedFilter);
  });

  const findAllOptions = (optionLabel: any) => {
    const optionsFound: any[] = []
    filterAvailable.options.forEach((element: { label: any; field_value: any; }) => {
      if (element.label === optionLabel) {
        optionsFound.push(element.field_value)
      }
    })
    return optionsFound;
  };
  const findAllLabels = (field_value: any) => {
    const optionsFound: any[] = []
    filterAvailable.options.forEach((element: { field_value: any; label: any; }) => {
      if (element.field_value === field_value) {
        optionsFound.push(element.label)
      }
    })
    return optionsFound;
  };

  const handleOptionsSelectedChange = (event: { target: { value: any; }; }) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const values = typeof value === 'string' ? value.split(',') : value;
    setOptionsSelected(
      values,
    );
    // Building filter
    // Finding selected fields
    let selectedFields: any[] = []
    values.forEach((optionLabel: any) => {
      selectedFields = selectedFields.concat(findAllOptions(optionLabel))
    })
    const filters: Filter[] = []
    const complexFilter = {
      logic: 'or',
      filters
    }
    selectedFields.forEach(optionFieldValue => {
      complexFilter.filters.push({
        "field": filterAvailable.field,
        "operator": "eq",
        "value": optionFieldValue
      })
    })
    filterChanged(complexFilter)
  };

  React.useEffect(() => {
    const storedOptions = getStoredOptions(storedFilter);
    const allOptions: any = []
    storedOptions.forEach((field_value) => {
      allOptions.push(...findAllLabels(field_value))
    })
    setOptionsSelected(allOptions);
  },
    [storedFilter]
  );

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{filterAvailable.label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-multiple-chip"
          multiple
          label={filterAvailable.label}
          value={optionsSelected}
          onChange={handleOptionsSelectedChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                // eslint-disable-next-line react/jsx-key
                <Chip label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {filterAvailable.options.map((option: any) => (
            // eslint-disable-next-line react/jsx-key
            <MenuItem value={option.label}>
              <Checkbox checked={optionsSelected.indexOf(option.label) > -1} />
              <ListItemText primary={option.label} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
