import React, { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import WeatherSymbol from './WeatherSymbol';
import { getMonthDateFromNow } from '../lib/Dates';

function createData(
  date,
  weatherIcon,
  weatherDescription,
  maxTemp,
  minTemp,
  rain,
  moreInfo,
) {
  return {
    date,
    weatherIcon,
    weatherDescription,
    maxTemp,
    minTemp,
    rain,
    moreInfo,
  };
}

function Row({ row }) {
  const [open, setOpen] = useState(false);
  const tdStyle = {
    borderTop: '2px solid black',
  };

  return (
    <>
      <tr>
        <td style={tdStyle}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td style={tdStyle}>{row.date}</td>
        <td style={tdStyle}>
          <WeatherSymbol
            weatherIconCode={row.weatherIcon}
            description=""
            width="100px"
            height="100px"
          />
        </td>
        <td style={tdStyle}>
          {row.maxTemp}
          /
          {row.minTemp}
        </td>
        <td style={tdStyle}>{row.rain}</td>
      </tr>
      <tr>
        <td colSpan={5}>
          <Collapse in={open} timeout="auto" unmounOnExit>
            <Typography variant="h6" gutterBottom component="div">
              {row.weatherDescription}
            </Typography>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <table aria-label="more weather info">
                <tbody>
                  {row.moreInfo.map((item) => (
                    <tr>
                      <td style={{ textAlign: 'end' }}>{item.name}</td>
                      <td style={{ textAlign: 'start' }}>{item.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Collapse>
        </td>
      </tr>
    </>
  );
}

function DailyWeatherTable({ dailyWeather, limit }) {
  const rows = [];
  const tableStyle = {
    borderCollapse: 'collapse',
  };

  for (let i = 0; i < limit; i += 1) {
    const weather = dailyWeather[i];
    const date = getMonthDateFromNow(i + 1);
    const weatherIcon = weather.icon;
    const weatherDescription = weather.description;
    const maxTemp = weather.temp.max.quantity;
    const minTemp = weather.temp.min.quantity;
    const rain = weather.pop.measurement;
    const moreInfo = [
      {
        name: 'Humidity',
        value: weather.humidity.measurement,
      },
      {
        name: 'Wind Speed',
        value: weather.wind_speed.measurement,
      },
      {
        name: 'UV Index',
        value: weather.uvi,
      },
    ];

    const row = createData(
      date,
      weatherIcon,
      weatherDescription,
      maxTemp,
      minTemp,
      rain,
      moreInfo,
    );

    rows.push(row);
  }

  return (
    <Box>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th aria-label="expand button" />
            <th>Date</th>
            <th>Weather</th>
            <th>
              {`Temp ${dailyWeather[0].temp.max.unit}`}
            </th>
            <th>Rain</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </tbody>
      </table>
    </Box>
  );
}

export default DailyWeatherTable;
