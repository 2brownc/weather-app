import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import useBrowserLocation from './components/LocationFromBrowser';
import useOpenWeather from './components/Weather';
import useOpenWeatherGeoLocation from './components/GeoLocation';
import Dashboard from './components/Dashboard';

import {
  fetchWeatherInfo,
  setWeatherUnits,
  weatherInfo,
  weatherStatus,
} from './features/weather/weatherSlice';

// load API keys
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = process.env.REACT_APP_UNSPLASH_SECRET_KEY;

function App() {
  const [loc, setLoc] = useState(null);
  // const [weather, setWeather] = useState(null);
  const [geoLoc, setGeoLoc] = useState(null);

  const [locCounter, setLocCounter] = useState(0);
  const [weatherCounter, setWeatherCounter] = useState(0);
  const [geoLocCounter, setGeoLocCounter] = useState(0);

  const [units, setUnits] = useState('metric');

  const dispatch = useDispatch();

  const {
    loc: browserLoc,
    error: browserLocError,
  } = useBrowserLocation(locCounter);

  useEffect(() => {
    if (browserLoc !== null && browserLoc !== undefined) {
      setLoc(browserLoc);
      console.log('browserLoc', browserLoc);
      const { latitude, longitude } = browserLoc;
      dispatch(fetchWeatherInfo({ latitude, longitude, OPEN_WEATHER_KEY }));
    }
  }, [browserLoc, dispatch]);

  /*
  const {
    weather: weatherInfo,
    loading: weatherLoading,
    error: weatherError,
  } = useOpenWeather(loc, OPEN_WEATHER_KEY, units, weatherCounter);

  const {
    loc: geoLocInfo,
    loading: geoLocLoading,
    error: geoLocError,
  } = useOpenWeatherGeoLocation(loc, OPEN_WEATHER_KEY, geoLocCounter);

  useEffect(() => {
    if (weatherInfo !== null && weatherInfo !== undefined) {
      setWeather(weatherInfo);
    }
  }, [weatherInfo]);

  useEffect(() => {
    setGeoLoc(geoLocInfo);
  }, [geoLocInfo]);
*/

  const weatherLoadingStatus = useSelector(weatherStatus);
  const weather = useSelector(weatherInfo);
  console.log(weatherLoadingStatus, weather);

  useEffect(() => {
    if (weatherLoadingStatus === 'succeded') {
      dispatch(setWeatherUnits(units));
    }
  }, [weatherLoadingStatus, units, dispatch]);

  return (
    <div style={{ backgroundColor: 'white' }} className="App">
      {weatherLoadingStatus === 'failed' && <p>Error Loading Weather Information</p>}
      {weatherLoadingStatus === 'loading' && <p>Loading Weather Information...</p> }
      {weatherLoadingStatus === 'succeded' && <Dashboard weather={weather} units={units} geoLoc={geoLoc} /> }
    </div>
  );
}

export default App;
