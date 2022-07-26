import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import CurrentWeatherCardSkeleton from './CurrentWeatherSkeleton';
import HourlyWeatherCardSkeleton from './HourlyWeatherSkeleton';
import DailyWeatherCardSkeleton from './DailyWeatherSkeleton';

function Dashboard() {
  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <CurrentWeatherCardSkeleton />
        <HourlyWeatherCardSkeleton />
        <DailyWeatherCardSkeleton />
      </Stack>
    </Container>
  );
}

export default Dashboard;
