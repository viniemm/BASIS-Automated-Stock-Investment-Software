import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {TextField} from "@mui/material";

let updateTimer: NodeJS.Timeout | null = null;

export default function PropertyDropdown(props:any) {
  const {children, optionsAvailable, savedState, title, dropdownChanged, ...rest} = props;

  const findPropertyAvailable = (propSelection: any) => {
    // Find property available
    let propertyAvailable = null;
    let granularityAvailable = null;
    for (let i = 0; i < optionsAvailable.length; i++) {
      if (optionsAvailable[i].attribute === propSelection) {
        propertyAvailable = optionsAvailable[i];
        granularityAvailable = propertyAvailable.granularity_available;
        break;
      }
    }
    return {propertyAvailable, granularityAvailable}
  }

  const getDefaultGranularityForSelectedProperty = (propSelection:any) => {
    // Find property available
    const {propertyAvailable, granularityAvailable} = findPropertyAvailable(propSelection)
    // Set default granularity
    if (granularityAvailable == null) {
      return null;
    }
    if (granularityAvailable.includes("category")) {
      return "category";
    }
    // Digit
    if (granularityAvailable.includes("digit")) {
      let defaultGranularity = 1;
      if (propertyAvailable.attribute.includes("seconds")) {
        defaultGranularity = 3600;
      }
      return defaultGranularity
    }
    // Any other type
    return granularityAvailable[0];
  }

  const [mergedState, setMergedState] = React.useState(() => {
    let propSelection = optionsAvailable[0].attribute;
    if (savedState) {
      propSelection = savedState.attribute;
    }
    // No saved state
    let granularitySelection = getDefaultGranularityForSelectedProperty(propSelection);
    // There is a saved state
    if (savedState) {
      granularitySelection = savedState.granularity;
    }
    return {
      attribute: propSelection,
      granularity: granularitySelection
    }
  });

  const handlePropertyChange = (event: { target: { value: any; }; }) => {
    if (event.target.value === mergedState.attribute) {
      return;
    }
    handleGranularityUpdateOnPropertyChange(event.target.value);
  };

  const handleGranularityChange = (event: { target: { value: any; }; }) => {
    updatedDropdown({
      attribute: mergedState.attribute,
      granularity: event.target.value
    });
  };

  const handleGranularityUpdateOnPropertyChange = (propSelection: any) => {
    const {propertyAvailable, granularityAvailable} = findPropertyAvailable(propSelection);
    const defaultGranularity = getDefaultGranularityForSelectedProperty(propSelection);
    let selectedGranularity = mergedState.granularity;
    if (granularityAvailable.includes("category")) {
      // In case it does not have granularity
      selectedGranularity = "category";
    } else if (granularityAvailable.includes('digit')) {
      // Granularity is digit
      if (typeof mergedState.granularity != 'number') {
        selectedGranularity = defaultGranularity;
      }
    } else if (!granularityAvailable.includes(mergedState.granularity)) {
      // Basically all types of other granularities
      selectedGranularity = defaultGranularity;
    }
    updatedDropdown({
      attribute: propSelection,
      granularity: selectedGranularity
    });
  }

  const updatedDropdown = (state: { attribute: any; granularity?: any; operation?: any; }) => {
    const {propertyAvailable, granularityAvailable} = findPropertyAvailable(state.attribute);
    if ('operations_available' in propertyAvailable) {
      state.operation = propertyAvailable.operations_available[0];
    }
    if (updateTimer == null) {
      updateTimer = setTimeout(() => {
        dropdownChanged(state);
        updateTimer = null;
      }, 100);
    }
  }

  React.useEffect(() => {
      setMergedState(savedState);
    },
    [savedState]
  )

  const generateGranularitySelector = (property: { granularity_available: any[]; }) => {
    return (
      <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{title + " Bucket Size"}</InputLabel>
      <Select
        variant="outlined"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={mergedState.granularity}
        label={title + " Bucket Size"}
        onChange={handleGranularityChange}
      >
        {
          property.granularity_available.map((granularity: any) => (
            // eslint-disable-next-line react/jsx-key
            <MenuItem value={granularity}>{granularity}</MenuItem>
          ))
        }
      </Select>
      </FormControl>)
  };

  const generateGranularityInput = (property: any) => {
    return <FormControl fullWidth><TextField
      id="outlined-number"
      label={title + " Bucket Size"}
      type="number"
      value={mergedState.granularity}
      onChange={handleGranularityChange}
      InputLabelProps={{
        shrink: true,
      }}
    >
    </TextField></FormControl>
  }

  const generateGranularity = () => {

    const {propertyAvailable, granularityAvailable} = findPropertyAvailable(mergedState.attribute);
    if (granularityAvailable !== null) {
      if (granularityAvailable.includes("digit")) {
        return generateGranularityInput(propertyAvailable)
      }
      else if (!granularityAvailable.includes("category")) {
        return generateGranularitySelector(propertyAvailable)
      }
    }
  }

  return (
    <Box sx={{ minWidth: 120, display: "flex", m: 3, flexDirection: "column", gap: 3}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={mergedState.attribute}
          label={title}
          onChange={handlePropertyChange}
        >

          {
            optionsAvailable.map((property: { attribute: string | number | readonly string[] | undefined; label: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
              // eslint-disable-next-line react/jsx-key
              <MenuItem value={property.attribute}>{property.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      {generateGranularity()}
    </Box>
  );
}
