import React from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import CurrentWeatherCard from './CurrentWeather';
import HourlyWeatherCard from './HourlyWeather';
import DailyWeatherCard from './DailyWeather';
import { DisplayWeatherAlert } from './WeatherAlert';

function Dashboard({ weather, geoLoc, weatherAlert }) {
  if (weather === null || weather === undefined) {
    return undefined;
  }
  const alerts = [
    {
      sender_name: 'NWS Tulsa',
      event: 'Heat Advisory',
      start: 1597341600,
      end: 1597366800,
      description: '...HEAT ADVISORY REMAINS IN EFFECT FROM 1 PM THIS AFTERNOON TO\n8 PM CDT THIS EVENING...\n* WHAT...Heat index values of 105 to 109 degrees expected.\n* WHERE...Creek, Okfuskee, Okmulgee, McIntosh, Pittsburg,\nLatimer, Pushmataha, and Choctaw Counties.\n* WHEN...From 1 PM to 8 PM CDT Thursday.\n* IMPACTS...The combination of hot temperatures and high\nhumidity will combine to create a dangerous situation in which\nheat illnesses are possible.',
      tags: [
        'Extreme temperature value',
      ],
    },

  ];

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <DisplayWeatherAlert
          alerts={[...alerts, ...alerts, ...alerts]}
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
