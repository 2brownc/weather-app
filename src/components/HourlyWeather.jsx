import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useElementSize } from 'use-element-size';

import HeatMap from './GenHeatMap';
import WeatherToBin from '../lib/WeatherToBin';

function HourlyWeatherCard({ hourly }) {
  const toolTipText = (quantity) => (value, period) => `${quantity} is ${value} on ${period}`;

  const { binData: tempBinData, tooltips: tempTooltips } = WeatherToBin(
    hourly,
    'temp',
    toolTipText('Temperature'),
    24,
  );

  const { binData: rainBinData, tooltips: rainToolTips } = WeatherToBin(
    hourly,
    'pop',
    toolTipText('Chance of rain'),
    24,
  );

  const { binData: humBinData, tooltips: humToolTips } = WeatherToBin(
    hourly,
    'humidity',
    toolTipText('Humidity'),
    24,
  );

  const { binData: uviBinData, tooltips: uviToolTips } = WeatherToBin(
    hourly,
    'uvi',
    toolTipText('UV Index'),
    24,
  );

  const [gridWidth, setGridWidth] = useState(null);

  const gridRef = useElementSize((size) => {
    setGridWidth(size.width);
  });

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hourly Weather
        </Typography>
        <Stack
          spacing={1}
          ref={gridRef}
        >
          <HeatMap
            binData={tempBinData}
            tooltips={tempTooltips}
            width={gridWidth}
            height={50}
            text="Temperature"
            textHeight={15}
            highColor="#c32148"
            lowColor="#ffffff"
          />
          <HeatMap
            binData={rainBinData}
            tooltips={rainToolTips}
            width={gridWidth}
            height={50}
            text="Chance of Rain"
            textHeight={15}
            highColor="#0000ff"
            lowColor="#4d4dff"
          />
          <HeatMap
            binData={humBinData}
            tooltips={humToolTips}
            width={gridWidth}
            height={50}
            text="Humidity"
            textHeight={15}
            highColor="#1560bd"
            lowColor="#ffffff"
          />
          <HeatMap
            binData={uviBinData}
            tooltips={uviToolTips}
            width={gridWidth}
            height={50}
            text="UV Index"
            textHeight={15}
            highColor="#ed872d"
            lowColor="#eedc82"
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HourlyWeatherCard;
