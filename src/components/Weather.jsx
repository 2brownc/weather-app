import { useState, useEffect } from 'react';

const useOpenWeather = (location, API_KEY, units, weatherCounter) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect((location, API_KEY, units) => {
    if (location === null || location === undefined) {
      return;
    }

    const OPEN_WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/onecall?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}&units=${units}`;
    setError(null);
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(OPEN_WEATHER_API_ENDPOINT);
        if (!response.ok) {
          const errText = await response.text();
          setError(errText);
          throw new Error(
            `Unable get weather info for lat:${location.latitude}, lon:${location.longitude}`,
          );
        }

        const body = await response.json();
        setWeather(body);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [weatherCounter]);

  return { weather, loading, error };
};

export default useOpenWeather;
