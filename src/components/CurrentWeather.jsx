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

function RainInfo({ current }) {
  if (current.rain !== null) {
    return (
      <TableRow>
        <TableCell align="right">
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
        <TableCell align="right">
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
                <TableBody>
                  <TableRow>
                    <TableCell align="right">
                      Humidity
                    </TableCell>
                    <TableCell>
                      <span>{current.humidity.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      UV Index
                    </TableCell>
                    <TableCell>
                      {Math.round(current.uvi)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Pressure
                    </TableCell>
                    <TableCell>
                      <span>{current.pressure.measurement}</span>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="right">
                      Visibility
                    </TableCell>
                    <TableCell>
                      <span>{current.visibility.measurement}</span>
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
