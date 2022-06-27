import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import symbol from '../lib/getUnits';
import WeatherSymbol from './WeatherSymbol';

function RainInfo({ current }) {
  if ({}.propertyIsEnumerable.call(current, 'rain')) {
    return (
      <>
        <Grid item xs={6}>
          <span>Rain Volume (~ 1hr)</span>
        </Grid>
        <Grid item xs={6}>
          <span>
            <span>{current.rain['1h']}</span>
            <span>mm</span>
          </span>
        </Grid>
      </>
    );
  }
}

function CurrentWeatherCard({ current, units }) {
  if (current === null || current === undefined) {
    return undefined;
  }

  // console.log("CurrentWeatherCard: weather: ", current)

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Current Weather
        </Typography>

        <Grid
          container
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={3}>
            <WeatherSymbol
              weatherIconCode={current.weather[0].icon}
              description={current.weather[0].description}
            />
          </Grid>

          <Grid container item xs={12} md={8}>
            <Grid item xs={12} md={12}>
              <Typography variant="h5" component="div">
                <span>
                  <span>
                    {current.temp}
                    {' '}
                  </span>
                  <span>{symbol('temperature', units)}</span>
                </span>
              </Typography>
            </Grid>
            <Grid item xs={6} md={6}>
              <span>Humidity</span>
            </Grid>
            <Grid item xs={6} md={6}>
              <span>
                {current.humidity}
                <span>%</span>
              </span>
            </Grid>

            <Grid item xs={6} md={6}>
              <span>UV Index</span>
            </Grid>
            <Grid item xs={6} md={6}>
              <span>{Math.round(current.uvi)}</span>
            </Grid>

            <Grid item xs={6} md={6}>
              <span>Pressure</span>
            </Grid>
            <Grid item xs={6} md={6}>
              <span>
                <span>
                  {current.pressure}
                  {' '}
                </span>
                <span>hPa</span>
              </span>
            </Grid>
            <RainInfo current={current} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard;
