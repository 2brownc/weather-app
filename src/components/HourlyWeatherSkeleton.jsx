import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';

function HourlyWeatherCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hourly Weather
        </Typography>
        <Stack
          spacing={1}
        >
          <Skeleton variant="rectangle" />
          <Skeleton variant="rectangle" />
          <Skeleton variant="rectangle" />
          <Skeleton variant="rectangle" />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HourlyWeatherCardSkeleton;
