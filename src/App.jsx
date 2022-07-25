import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import SettingsMenu from './components/SettingsMenu';

import {
  fetchLocationFromBrowser,
  fetchLocationFromBrowserError,
  locationFromBrowser,
  locationFromBrowserStatus,
} from './features/locationFromBrowser/locationBrowserSlice';

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

  const [browserGeoLocSupport, setBrowserGeoLocSupport] = useState(null);

  const [units, setUnits] = useState('metric');

  const [openWeatherAlert, setOpenWeatherAlert] = React.useState(true);
  const [displayWeatherAlertButton, setDisplayWeatherAlertButton] = React.useState(false);
  const [openSettingsMenu, setOpenSettingsMenu] = React.useState(false);
  const [currentLoc, setCurrentLoc] = React.useState(false);

  const location = useSelector(locationFromBrowser);
  const locationStatus = useSelector(locationFromBrowserStatus);

  const dispatch = useDispatch();
  React.useEffect(() => {
    const browserLocation = navigator.geolocation;
    if (browserLocation) {
      browserLocation.getCurrentPosition(
        (success) => {
          dispatch(fetchLocationFromBrowser(success));
        },
        (failure) => {
          dispatch(fetchLocationFromBrowserError(failure));
        },
      );
    } else {
      setBrowserGeoLocSupport(false);
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (
      locationStatus === 'SUCCEDED'
        && location !== undefined
        && location !== null
    ) {
      setCurrentLoc(location);
    }
  }, [location, locationStatus]);

  React.useEffect(() => {
    if (currentLoc !== undefined
        && currentLoc !== null
        && currentLoc.latitude !== undefined
        && currentLoc.longitude !== undefined
    ) {
      const { latitude: lat, longitude: lon } = currentLoc;
      dispatch(fetchWeatherInfo({ lat, lon, OPEN_WEATHER_API_KEY }));
      dispatch(fetchGeoLocationInfo({ lat, lon, OPEN_WEATHER_API_KEY }));
    }
  }, [currentLoc, dispatch]);

  const weatherCurrentStatus = useSelector(weatherStatus);
  const weather = useSelector(weatherInfo);
  const geoLocationCurrentStatus = useSelector(geoLocationStatus);
  const geoLocation = useSelector(geoLocationInfo);

  useEffect(() => {
    if (weatherCurrentStatus === 'SUCCEDED') {
      dispatch(setWeatherUnits(units));
    }
  }, [units, weatherCurrentStatus, dispatch]);

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
                units={units}
                setUnits={setUnits}
                setOpenSettingsMenu={setOpenSettingsMenu}
              />
              <Dashboard
                weather={weather}
                units={units}
                geoLoc={geoLocation}
                weatherAlert={{ openWeatherAlert, setOpenWeatherAlert }}
                setOpenSettingsMenu={setOpenSettingsMenu}
              />
              <SettingsMenu
                openSettingsMenu={openSettingsMenu}
                setOpenSettingsMenu={setOpenSettingsMenu}
                units={units}
                setUnits={setUnits}
                setCurrentLoc={setCurrentLoc}
                setBrowserGeoLocStatus={setBrowserGeoLocSupport}
              />
              {' '}

            </>
          )
      }
    </div>
  );
}

export default App;
