import React, { useEffect, useState } from 'react';

import './App.css';
import useBrowserLocation from './components/LocationFromBrowser';
import useOpenWeather from './components/Weather';
import Dashboard from './components/Dashboard';

// load API keys
const OPEN_WEATHER_KEY = process.env.REACT_APP_OPEN_WEATHER_KEY;
const UNSPLASH_ACCESS_KEY = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
const UNSPLASH_SECRET_KEY = process.env.REACT_APP_UNSPLASH_SECRET_KEY;

function App() {
  const [loc, setLoc] = useState(null);
  const [weather, setWeather] = useState(null);

  const [locCounter, setLocCounter] = useState(0);
  const [weatherCounter, setWeatherCounter] = useState(0);

  const [units, setUnits] = useState('metric');

  const { loc: browserLoc, error: browserLocError } = useBrowserLocation(locCounter);

  useEffect(() => {
    if (browserLoc !== null && browserLoc !== undefined) {
      setLoc(browserLoc);
    }
  }, [browserLoc]);

  useEffect(() => {
    if (loc !== null) {
      setWeatherCounter(weatherCounter + 1);
    }
  }, [loc]);

  const {
    weather: weatherInfo,
    loading: weatherLoading,
    error: weatherError,
  } = useOpenWeather(loc, OPEN_WEATHER_KEY, units, weatherCounter);

  useEffect(() => {
    setWeather(weatherInfo);
  }, [weatherInfo]);

  return (
    <div className="App">
      {weatherError && <p>Error Loading Weather Information</p>}
      {weatherLoading ? (
        <p>Loading Weather Information...</p>
      ) : (
        <Dashboard weather={weather} units={units} />
      )}
    </div>
  );
}

export default App;
