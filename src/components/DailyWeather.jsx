import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import DailyWeatherTable from './GenWeatherTable';

function DailyWeatherCard({ daily, units }) {
  if (daily === null || daily === undefined) {
    return undefined;
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Daily Weather
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItem="center"
        >
          <DailyWeatherTable dailyWeather={daily} units={units} />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DailyWeatherCard;
