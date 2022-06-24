import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";

import WeatherSymbol from "./WeatherSymbol";
import getMonthDateFromNow from "../lib/Dates";

function createData(
  date,
  weatherIcon,
  weatherDescription,
  maxTemp,
  minTemp,
  rain,
  moreInfo
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

  return (
    <>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{row.date}</td>
        <td>
          <WeatherSymbol
            weatherIconCode={row.weatherIcon}
            description=""
            width="30%"
            height="30%"
          />
        </td>
        <td>
          {row.maxTemp}/{row.minTemp}
        </td>
        <td>{row.rain}</td>
      </tr>
      <tr>
        <td>
          <Collapse in={open} timeout="auto" unmounOnExit>
            <Box sx={{ margin: 0 }}>
              <Typography variant="h6" gutterBottom component="div">
                {row.weatherDescription}
              </Typography>
              <table size="small" aria-label="more weather info">
                <tbody>
                  {row.moreInfo.map((item) => (
                    <tr>
                      <td>{item.name}</td>
                      <td>{item.value}</td>
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

function DailyWeatherDataGrid({ dailyWeather, units }) {
  const rows = [];

  for (let i = 0; i < dailyWeather.length; i += 1) {
    const weather = dailyWeather[i];
    const date = getMonthDateFromNow(i + 1);
    const weatherIcon = weather.weather[0].icon;
    const weatherDescription = weather.weather[0].description;
    const maxTemp = parseInt(weather.temp.max, 10);
    const minTemp = parseInt(weather.temp.min, 10);
    const rain = `${parseInt(weather.pop * 100, 10)}%`;
    const moreInfo = [
      {
        name: "Humidity",
        value: weather.humidity,
      },
      {
        name: "Wind Speed",
        value: weather.wind_speed,
      },
      {
        name: "UV Index",
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
      moreInfo
    );

    rows.push(row);
  }

  return (
    <table>
      <thead>
        <tr>
                       <th />
                <th>Date</th>
          <th>Weather</th>
          <th>Temp {units === "metric" ? "°C" : "°F"}</th>
          <th>Chance of Rain</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row key={row.name} row={row} />
        ))}
      </tbody>
    </table>
  );
}

export default DailyWeatherDataGrid;
