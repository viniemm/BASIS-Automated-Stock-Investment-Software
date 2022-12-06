import React from 'react';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
      <Grid container spacing={4}>
        <Grid item xs={8}>
          <Card variant="outlined">
            <Typography fontSize="xl" sx={{ mb: 0.5 }}>
              Your Profile
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          
        </Grid>
        <Grid item xs={8}>
        </Grid>
        <Grid item xs={4}>
          <Button variant="outlined">
              <Link to="/questionnaire"> Make a New Portfolio </Link>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}