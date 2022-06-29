import { useState, useEffect } from 'react';

const useOpenWeatherGeoLoc = (locCoords, API_KEY, counter) => {
  console.log('locCoords, api key, counter', locCoords, API_KEY, counter);

  const [loc, setLoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (locCoords === null || locCoords === undefined) {
      return;
    }

    const { latitude, longitude } = locCoords;
    const OPEN_WEATHER_GEOLOCATION_API = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    setError(null);
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(OPEN_WEATHER_GEOLOCATION_API);
        if (!response.ok) {
          const errText = await response.text();
          setError(errText);
          throw new Error(
            `Unable get location info for lat:${latitude}, lon:${longitude}`,
          );
        }

        const body = await response.json();
        setLoc(body);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [counter]);

  return { loc, loading, error };
};

export default useOpenWeatherGeoLoc;
