import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PropertyDropdown from "./PropertyDropdown";
import CategoryFilter from "./filters/CategoryFilter";
import TextFilter from "./filters/TextFilter";
import ReportDropdown from "./ReportDropdown";
import Loading from "./Loading";
import DateFilter from "./filters/DateFilter";
import ChartType from "./ChartType";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


const drawerWidth = 400;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Specifies default filters
let filterMap = new Map();

export default function PersistentDrawerLeft(props) {
  const {
    loading,
    chartType,
    chartTypeChanged,
    children,
    reportsAvailable,
    reportChanged,
    reportState,
    filtersAvailable,
    filtersChanged,
    filterState,
    ...rest
  } = props;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const parseFilterStateToMap = () => {
    // TODO: this function makes a bunch of assumptions about formatting
    if (filterState != null) {
      filterState.complex_filter.filters.forEach((filter) => {
        if (filter != null && 'filters' in filter && 'logic' in filter && filter.filters.length > 0 && 'field' in filter.filters[0]) {
          let field = filter.filters[0].field;
          let complexFilter = {
            "logic": filter.logic,
            "filters": []
          };
          filter.filters.forEach((subfilter) => {
            if ('field' in subfilter && subfilter.field === field) {
              complexFilter.filters.push(subfilter)
            }
          });
          // I use field as filterId
          filterMap.set(field, complexFilter);
        }
      })
    }
  }

  // Flush filterMap every time the report is changed
  React.useEffect(() => {
      filterMap = new Map();
    },
    [reportState]
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const XAxisPropertyChanged = (filter) => {
    filtersChanged({ x_axis: filter });
  };

  const YAxisPropertyChanged = (filter) => {
    filtersChanged({ y_axis: filter });
  };

  const BreakdownPropertyChanged = (filter) => {
    filtersChanged({ breakdown: filter });
  };

  const filterChanged = (filterId, filter) => {
    filterMap.set(filterId, filter);

    let complexFilter = {
      "logic": "and",
      "filters": []
    }
    filterMap.forEach((value, key) => {
      if (value !== null) {
        complexFilter.filters.push(value);
      }
    });
    console.log('complexFilter: ');
    console.log(complexFilter);
    filtersChanged({ complex_filter: complexFilter });
  }

  const nameChanged = (event) => {
    setName(event.target.value);
  };

  const buildXAxisProperty = () => {
    if (reportState.properties_visible.x_axis_property) {
      // Passing undefined prop is the same as not including it
      return <PropertyDropdown
        title="XAxis"
        optionsAvailable={filtersAvailable.x_axis}
        savedState={filterState.x_axis}
        dropdownChanged={XAxisPropertyChanged}
      ></PropertyDropdown>
    }
  }

  const buildYAxisProperty = () => {
    if (reportState.properties_visible.y_axis_property) {
      // Passing undefined prop is the same as not including it
      return <PropertyDropdown
        title="YAxis"
        optionsAvailable={filtersAvailable.y_axis}
        savedState={filterState.y_axis}
        dropdownChanged={YAxisPropertyChanged}
      ></PropertyDropdown>
    }
  }

  const buildBreakdownProperty = () => {
    if (reportState.properties_visible.breakdown_property) {
      return <PropertyDropdown
        title="Breakdown"
        optionsAvailable={filtersAvailable.breakdown}
        savedState={filterState.breakdown}
        dropdownChanged={BreakdownPropertyChanged}
      ></PropertyDropdown>
    }
  }

  const buildFilter = () => {
    parseFilterStateToMap();
    let filters = filtersAvailable.filters.map((filter) => {
      if (filter.field_type === "category") {
        return <CategoryFilter
          filterAvailable={filter}
          storedFilter={(filterMap.has(filter.field)) && filterMap.get(filter.field)}
          filterChanged={(buildFilter) => {filterChanged(filter.field, buildFilter)}}
        ></CategoryFilter>
      }
      if (filter.field_type === "text") {
        return <TextFilter
          filterAvailable={filter}
          storedFilter={(filterMap.has(filter.field)) && filterMap.get(filter.field)}
          filterChanged={(buildFilter) => {filterChanged(filter.field, buildFilter)}}
        ></TextFilter>
      }
      if (filter.field_type === "date") {
        return <DateFilter
          filterAvailable={filter}
          storedFilter={(filterMap.has(filter.field)) && filterMap.get(filter.field)}
          filterChanged={(buildFilter) => {filterChanged(filter.field, buildFilter)}}
        ></DateFilter>
      }
      return null
    })
    return filters;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {reportState.label}
          </Typography>
          {loading && <Loading/>}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap component="div" sx={{overflow: "visible"}}>
            Filters Toolbar
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h6" noWrap component="div" sx={{marginTop: 2, overflow: "visible"}}>
          Select Report
        </Typography>
        <ReportDropdown
          reportsAvailable={reportsAvailable}
          reportChanged={reportChanged}
          reportState={reportState}
        />
        <Divider />
        <Typography variant="h6" noWrap component="div" sx={{marginTop: 2, overflow: "visible"}}>
          Filters
        </Typography>
        {(filtersAvailable.filters.length > 0) && buildFilter()}
        <Divider />
        <Typography variant="h6" noWrap component="div" sx={{marginTop: 2, overflow: "visible"}}>
          Chart Properties
        </Typography>
        {(filtersAvailable.breakdown.length > 0) && buildBreakdownProperty()}
        {(filtersAvailable.x_axis.length > 0) && buildXAxisProperty()}
        {(filtersAvailable.y_axis.length > 0) && buildYAxisProperty()}
        <Divider/>
        <Typography variant="h6" noWrap component="div" sx={{marginTop: 2, overflow: "visible"}}>
          Chart Type Selector
        </Typography>
        <ChartType
          chartType={chartType}
          chartTypeChanged={chartTypeChanged}
        />
        <Divider />
        <TextField
          id="filter-name"
          label="Name"
          value={name}
          onChange={nameChanged}
        />        
        <Button
          variant="contained"
          onClick={(event) => {
            console.log(name);
          }}
        >
          Save Filter
        </Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
