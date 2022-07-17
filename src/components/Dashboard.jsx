import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import CurrentWeatherCard from './CurrentWeather';
import HourlyWeatherCard from './HourlyWeather';
import DailyWeatherCard from './DailyWeather';

function Dashboard({ weather, geoLoc }) {
  if (weather === null || weather === undefined) {
    return undefined;
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <CurrentWeatherCard current={weather.current} geoLoc={geoLoc} />
        <HourlyWeatherCard hourly={weather.hourly} />
        <DailyWeatherCard daily={weather.daily} />
      </Stack>
    </Container>
  );
}

export default Dashboard;
