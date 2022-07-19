import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { TableContainer } from '@mui/material';
import WeatherSymbol from './WeatherSymbol';

import './CurrentWeather.css';

function RainInfo({ current }) {
  if (current.rain !== null) {
    return (
      <TableRow>
        <TableCell>
          <span>Rain Volume (~ 1hr)</span>
        </TableCell>
        <TableCell align="left">
          <span>
            <span>{current.rain.measurement}</span>
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

function SnowInfo({ current }) {
  if (current.snow !== null) {
    return (
      <TableRow>
        <TableCell>
          <span>Snow Volume (~ 1hr)</span>
        </TableCell>
        <TableCell align="left">
          <span>
            <span>{current.snow.measurement}</span>
          </span>
        </TableCell>
      </TableRow>
    );
  }
}

function CurrentWeatherCard({ current, geoLoc }) {
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
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item>
                <div style={{ fontSize: 'larger' }}>{geoLoc.name}</div>
                <div>{`${geoLoc.stateName}, ${geoLoc.country}`}</div>
              </Grid>
            </Grid>
            <WeatherSymbol
              weatherIconCode={current.icon}
              description={current.description}
            />
            <span style={{ fontSize: 'xx-large' }}>
              {current.temp.measurement}
              {' '}
            </span>
          </Grid>

          <Grid container item xs={12} md={8}>
            <TableContainer>
              <Table size="small">
                <colgroup>
                  <col className="weatherNames" />
                  <col className="weatherValues" />
                </colgroup>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      Humidity
                    </TableCell>
                    <TableCell>
                      <span>{current.humidity.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      UV Index
                    </TableCell>
                    <TableCell>
                      {Math.round(current.uvi)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Pressure
                    </TableCell>
                    <TableCell>
                      <span>{current.pressure.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Visibility
                    </TableCell>
                    <TableCell>
                      <span>{current.visibility.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Wind Speed
                    </TableCell>
                    <TableCell>
                      <span>{current.wind_speed.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      Wind Direction
                    </TableCell>
                    <TableCell>
                      <span>{current.wind_deg.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <RainInfo current={current} />
                  <SnowInfo current={current} />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CurrentWeatherCard;
