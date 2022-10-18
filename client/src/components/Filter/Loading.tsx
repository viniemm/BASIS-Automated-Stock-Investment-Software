import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useEffect, useRef, useState} from "react";

export default function Loading() {

  return (
    <Box sx={{ display: 'flex', color: 'grey.500' }} >
      <CircularProgress sx={{ color: 'grey.100', padding: "10px"}}/>
    </Box>
  );
}
