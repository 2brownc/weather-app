import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import DailyWeatherTable from './GenWeatherTable';

function DailyWeatherCard({ daily }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14, paddingBottom: '25px' }} color="text.secondary" gutterBottom>
          Daily Weather: The Next 7 Days
        </Typography>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItem="center"
        >
          <DailyWeatherTable dailyWeather={daily} />
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DailyWeatherCard;
