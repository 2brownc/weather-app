import { useEffect, useState } from 'react';

const useBrowserLocation = (locCounter) => {
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState(false);

  const onChange = ({ coords }) => {
    setLoc({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (err) => {
    setError(err.message);
  };

  useEffect(() => {
    const browserGeoLoc = navigator.geolocation;

    if (!browserGeoLoc) {
      setError('Browser Geolocation is not supported.');
    }

    browserGeoLoc.getCurrentPosition(onChange, onError);
  }, [locCounter]);

  return { loc, error };
};

export default useBrowserLocation;
