import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import changeWeatherUnits from '../../lib/WeatherUnitConvert';

function weatherPrepare(weather) {
  if (weather == null) return null;
  const currentWeather = {
    rain: weather.current.rain?.['1h'] ?? null,
    snow: weather.current.snow?.['1h'] ?? null,
    temp: weather.current.temp,
    humidity: weather.current.humidity,
    uvi: Math.round(weather.current.uvi),
    pressure: weather.current.pressure,
    visibility: weather.current.visibility,
    wind_speed: weather.current.wind_speed,
    wind_deg: weather.current.wind_deg,
    description: weather.current.weather[0].description,
    icon: weather.current.weather[0].icon,
  };

  const hourly = weather.hourly.map((hour) => ({
    dt: hour.dt,
    temp: hour.temp,
    pop: hour.pop * 100,
    humidity: hour.humidity,
    uvi: Math.round(hour.uvi),
  }));

  const daily = weather.daily.map((day) => ({
    dt: day.dt,
    icon: day.weather[0].icon,
    description: day.weather.description,
    temp: {
      max: Math.round(day.temp.max),
      min: Math.round(day.temp.min),
    },
    pop: day.pop * 100,
    humidity: day.humidity,
    wind_speed: day.wind_speed,
    uvi: Math.round(day.uvi),
  }));

  return {
    current: currentWeather,
    hourly,
    daily,
    alerts: weather.alerts ?? null,
  };
}

const initialState = {
  weatherSaved: null,
  weatherWithUnits: null,
  status: 'idle',
  error: null,
};

export const fetchWeatherInfo = createAsyncThunk(
  'weather/fetchWeatherInfo',
  async ({ lat, lon, OPEN_WEATHER_API_KEY }) => {
    const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;
    const response = await fetch(OPEN_WEATHER_API_ENDPOINT);

    return response.json();
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherUnits: (state, action) => {
      const units = action.payload;
      const weatherWithUnits = changeWeatherUnits(current(state.weatherSaved), units);

      return {
        ...state,
        weatherWithUnits,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherInfo.pending, (state) => {
        const status = 'LOADING';

        return {
          ...state,
          status,
        };
      })
      .addCase(fetchWeatherInfo.fulfilled, (state, action) => {
        const status = 'SUCCEDED';
        const weatherSaved = weatherPrepare(action.payload);

        return {
          ...state,
          status,
          weatherSaved,
        };
      })
      .addCase(fetchWeatherInfo.rejected, (state, action) => {
        const status = 'FAILED';
        const error = action.error.message;
        return {
          ...state,
          status,
          error,
        };
      });
  },
});

export const { setWeatherUnits } = weatherSlice.actions;

export default weatherSlice.reducer;

export const weatherInfo = (state) => state.weather.weatherWithUnits;
export const weatherStatus = (state) => state.weather.status;
