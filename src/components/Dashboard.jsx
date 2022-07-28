import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import CurrentWeatherCard from './CurrentWeather';
import HourlyWeatherCard from './HourlyWeather';
import DailyWeatherCard from './DailyWeather';
import { DisplayWeatherAlert } from './WeatherAlert';

import './Dashboard.css';

function Dashboard({ weather, geoLoc, weatherAlert }) {
  if (weather === null || weather === undefined) {
    return undefined;
  }
  return (
    <Container maxWidth="md" className="dashboard">
      <Stack spacing={3}>
        <DisplayWeatherAlert
          alerts={weather.alerts}
          setOpenWeatherAlert={weatherAlert.setOpenWeatherAlert}
          openWeatherAlert={weatherAlert.openWeatherAlert}
        />
        <CurrentWeatherCard current={weather.current} geoLoc={geoLoc} />
        <HourlyWeatherCard hourly={weather.hourly} />
        <DailyWeatherCard daily={weather.daily} />
      </Stack>
    </Container>
  );
}

export default Dashboard;
