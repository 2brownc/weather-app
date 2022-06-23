import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import WeatherSymbol from "./WeatherSymbol";
import getMonthDateFromNow from "../lib/Dates";

function createData(date, weatherIcon, maxTemp, minTemp, rain, moreInfo) {
  return {
    date,
    weatherIcon,
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
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="left">
          <WeatherSymbol
            weatherIconCode={row.weatherIcon}
            description=""
            width="30%"
            height="30%"
          />
        </TableCell>
        <TableCell align="center">{row.maxTemp}</TableCell>
        <TableCell align="center">{row.minTemp}</TableCell>
        <TableCell align="center">{row.rain}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmounOnExit>
            <Box sx={{ margin: 0 }}>
              <Typography variant="h6" gutterBottom component="div">
                HOI
              </Typography>
              <Table size="small" aria-label="more weather info">
                <TableBody>
                  {row.moreInfo.map((item) => (
                    <TableRow style={{ borderBottom: "1px solid black" }}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function DailyWeatherDataGrid({ dailyWeather, units }) {
  const rows = [];

  for (let i = 0; i < dailyWeather.length; i += 1) {
    const weatherUnits = units === "metric" ? "°C" : "°F";
    const weather = dailyWeather[i];
    const date = getMonthDateFromNow(i + 1);
    const weatherIcon = weather.weather[0].icon;
    const maxTemp = `weather.temp.max ${weatherUnits}`;
    const minTemp = `weather.temp.min ${weatherUnits}`;
    const rain = `${parseInt(weather.pop * 100, 10)}%`;
    const moreInfo = [
      {
        name: "Description",
        value: weather.weather[0].description,
      },
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

    const row = createData(date, weatherIcon, maxTemp, minTemp, rain, moreInfo);

    rows.push(row);
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell>Weather</TableCell>
            <TableCell>Max Temp</TableCell>
            <TableCell>Min Temp</TableCell>
            <TableCell>Chance of Rain</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DailyWeatherDataGrid;
