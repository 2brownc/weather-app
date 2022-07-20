import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import useBrowserLocation from './components/LocationFromBrowser';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

import {
  fetchWeatherInfo,
  setWeatherUnits,
  weatherInfo,
  weatherStatus,
} from './features/weather/weatherSlice';

import {
  fetchGeoLocationInfo,
  geoLocationInfo,
  geoLocationStatus,
} from './features/geoLocation/geoLocationSlice';

// load API keys
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = process.env.REACT_APP_UNSPLASH_SECRET_KEY;

function App() {
  // const [loc, setLoc] = useState(null);
  // const [weather, setWeather] = useState(null);

  const [locCounter, setLocCounter] = useState(0);
  const [weatherCounter, setWeatherCounter] = useState(0);
  const [geoLocCounter, setGeoLocCounter] = useState(0);

  const [units, setUnits] = useState('metric');

  const [openWeatherAlert, setOpenWeatherAlert] = React.useState(true);

  const [displayWeatherAlertButton, setDisplayWeatherAlertButton] = React.useState(false);

  const dispatch = useDispatch();

  const {
    loc: browserLoc,
    error: browserLocError,
  } = useBrowserLocation(locCounter);

  useEffect(() => {
    if (browserLoc !== null && browserLoc !== undefined) {
      // setLoc(browserLoc);
      const { latitude: lat, longitude: lon } = browserLoc;
      dispatch(fetchWeatherInfo({ lat, lon, OPEN_WEATHER_API_KEY }));
      dispatch(fetchGeoLocationInfo({ lat, lon, OPEN_WEATHER_API_KEY }));
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

  const weatherCurrentStatus = useSelector(weatherStatus);
  const weather = useSelector(weatherInfo);
  const geoLocationCurrentStatus = useSelector(geoLocationStatus);
  const geoLocation = useSelector(geoLocationInfo);

  useEffect(() => {
    if (weatherCurrentStatus === 'SUCCEDED') {
      dispatch(setWeatherUnits(units));
    }
  }, [units, weatherCurrentStatus, dispatch]);

  useEffect(() => {
  }, [weatherCurrentStatus, geoLocationCurrentStatus]);

  return (
    <div style={{ backgroundColor: 'white' }} className="App">
      {
        (weatherCurrentStatus === 'FAILED' || geoLocationCurrentStatus === 'FAILED')
          && <p>Error Loading Weather Information</p>
      }
      {
         (weatherCurrentStatus === 'LOADING' || geoLocationCurrentStatus === 'LOADING')
          && <p>Loading Weather Information...</p>
      }
      {
        (weatherCurrentStatus === 'SUCCEDED' && geoLocationCurrentStatus === 'SUCCEDED')
          && (
            <>
              <Header
                heading="Weather App"
                gitLink="https://github.com/2brownc/weather-app"
                weatherAlert={{ openWeatherAlert, setOpenWeatherAlert }}
                weather={weather}
              />
              <Dashboard
                weather={weather}
                units={units}
                geoLoc={geoLocation}
                weatherAlert={{ openWeatherAlert, setOpenWeatherAlert }}
              />
              {' '}

            </>
          )
      }
    </div>
  );
}

export default App;
