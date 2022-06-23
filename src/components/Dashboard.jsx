import React from "react";
import CurrentWeatherCard from "./CurrentWeather";
import HourlyWeatherCard from "./HourlyWeather";
import DailyWeatherCard from "./DailyWeather";

function Dashboard({ weather, units }) {
  if (weather === null || weather === undefined) {
    return undefined;
  }

  return (
    <>
      <CurrentWeatherCard current={weather.current} units={units} />

      <HourlyWeatherCard hourly={weather.hourly} units={units} />

      <DailyWeatherCard daily={weather.daily} units={units} />
    </>
  );
}

export default Dashboard;
