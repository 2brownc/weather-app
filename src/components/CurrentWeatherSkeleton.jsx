import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import './CurrentWeather.css';

function CurrentWeatherCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Current Weather
        </Typography>

        <Grid
          container
          spacing={4}
        >
          <Grid item xs={13} md={3}>
            <Skeleton variant="text" />

            <Skeleton variant="text" />
            <Skeleton variant="circular" width={75} height={75} sx={{ margin: 'auto' }} />
            <Skeleton variant="text" />
            <Skeleton variant="h4" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
            <Skeleton variant="text" />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCardSkeleton;
