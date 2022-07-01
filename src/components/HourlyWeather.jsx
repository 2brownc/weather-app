import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useElementSize } from 'use-element-size';

import HeatMap from './GenHeatMap';
import WeatherToBin from '../lib/WeatherToBin';
import symbol from '../lib/getUnits';

function HourlyWeatherCard({ hourly, units }) {
  if (hourly === null || hourly === undefined) {
    return undefined;
  }

  const toolTipText = (quantity, unit, valueMultiple) => (value, period) => `${quantity} is ${parseInt(value * valueMultiple, 10)}${unit} on ${period}`;

  const { binData: tempBinData, tooltips: tempTooltips } = WeatherToBin(
    hourly,
    'temp',
    toolTipText('Temperature', symbol('temperature', units), 1),
    24,
  );

  const { binData: rainBinData, tooltips: rainToolTips } = WeatherToBin(
    hourly,
    'pop',
    toolTipText('Chance of rain', '%', 100),
    24,
  );

  const { binData: humBinData, tooltips: humToolTips } = WeatherToBin(
    hourly,
    'humidity',
    toolTipText('Humidity', '%', 1),
    24,
    1,
  );

  const { binData: uviBinData, tooltips: uviToolTips } = WeatherToBin(
    hourly,
    'uvi',
    toolTipText('UV Index', '', 1),
    24,
    1,
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
              lowColor="#ed872d"
            />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default HourlyWeatherCard;
