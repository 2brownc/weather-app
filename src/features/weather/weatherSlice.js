import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';

import changeWeatherUnits from '../../lib/WeatherUnitConvert';

function weatherStrip(weather) {
  console.log('weather strip paramter', weather);
  if (weather == null) return null;
  const current = {
    rain: weather.current.rain?.['1h'] ?? null,
    snow: weather.current.snow?.['1h'] ?? null,
    temp: weather.current.temp,
    humidity: weather.current.humidity,
    uvi: weather.current.uvi,
    pressure: weather.current.pressure,
    visibility: weather.current.visibility,
    wind_speed: weather.current.wind_speed,
    wind_deg: weather.current.wind_deg,
    description: weather.current.description,
    icon: weather.current.icon,
  };

  const hourly = weather.hourly.map((hour) => ({
    dt: hour.dt,
    temp: hour.temp,
    pop: hour.pop,
    humidity: hour.humidity,
    uvi: hour.uvi,
  }));

  const daily = weather.daily.map((day) => ({
    dt: day.dt,
    icon: day.weather[0].icon,
    description: day.weather.description,
    temp: {
      max: day.temp.max,
      min: day.temp.min,
    },
    pop: day.pop,
    humidity: day.humidity,
    wind_speed: day.wind_speed,
    uvi: day.uvi,
  }));

  const alerts = {
    ...weather.alerts,
  };

  console.log('strip result', {
    current, hourly, daily, alerts,
  });

  return {
    current, hourly, daily, alerts,
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
  async ({ latitude, longitude, OPEN_WEATHER_KEY }) => {
    const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${OPEN_WEATHER_KEY}`;
    console.log('open weather api endpoint', OPEN_WEATHER_API_ENDPOINT);
    const response = await fetch(OPEN_WEATHER_API_ENDPOINT);

    console.log('response', response);
    return response.json();
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeatherUnits: (state, action) => {
      const units = action.payload;
      console.log('state, units', current(state.weatherSaved), units);
      state.weatherWithUnits = changeWeatherUnits(state.weatherSaved, units);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchWeatherInfo.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherInfo.fulfilled, (state, action) => {
        state.status = 'succeded';
        state.weatherSaved = weatherStrip(action.payload);
        console.log('full filled', state.weatherSaved);
      })
      .addCase(fetchWeatherInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('failed, state: ', state, action);
      });
  },
});

export const { setWeatherUnits } = weatherSlice.actions;

export default weatherSlice.reducer;

export const weatherInfo = (state) => state.weather.weatherWithUnits;
export const weatherStatus = (state) => state.weather.status;
