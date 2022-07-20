import getMeasurements from './Measurements';

function changeWeatherUnits(weather, unit) {
  if (weather == null) return null;

  const {
    current,
    hourly,
    daily,
  } = weather;

  const currentWeather = {
    ...current,
    temp: getMeasurements(
      'temperature',
      current.temp,
      unit,
    ),
    pressure: getMeasurements(
      'pressure',
      current.pressure,
      unit,
    ),
    humidity: getMeasurements(
      'humidity',
      current.humidity,
      unit,
    ),
    wind_speed: getMeasurements(
      'wind_speed',
      current.humidity,
      unit,
    ),
    wind_deg: getMeasurements(
      'wind_deg',
      current.wind_deg,
      unit,
    ),
    rain: getMeasurements(
      'rain',
      current.rain,
      unit,
    ),
    snow: getMeasurements(
      'snow',
      current.snow,
      unit,
    ),
    visibility: getMeasurements(
      'visibility',
      current.visibility,
      unit,
    ),
  };

  const hourlyWeather = hourly.map((hour) => ({
    dt: hour.dt,
    temp: getMeasurements(
      'temperature',
      hour.temp,
      unit,
    ),
    humidity: getMeasurements(
      'humidity',
      hour.humidity,
      unit,
    ),
    pop: getMeasurements(
      'pop',
      hour.pop,
      unit,
    ),
    uvi: hour.uvi,
  }));

  const dailyWeather = daily.map((day) => ({
    ...day,
    dt: day.dt,
    temp: {
      max: getMeasurements(
        'temperature',
        day.temp.max,
        unit,
      ),
      min: getMeasurements(
        'temperature',
        day.temp.min,
        unit,
      ),
    },
    humidity: getMeasurements(
      'humidity',
      day.humidity,
      unit,
    ),
    wind_speed: getMeasurements(
      'wind_speed',
      day.wind_speed,
      unit,
    ),
    pop: getMeasurements(
      'pop',
      day.pop,
      unit,
    ),
  }));

  return ({
    current: { ...currentWeather },
    hourly: [...hourlyWeather],
    daily: [...dailyWeather],
    alerts: { ...weather.alerts },
  });
}

export default changeWeatherUnits;
