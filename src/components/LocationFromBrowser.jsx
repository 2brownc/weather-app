import { useEffect, useState } from "react";

const useBrowserLocation = (loading) => {
  const [loc, setLoc] = useState(null);
  const [error, setError] = useState(false);

  const onChange = ({ coords }) => {
    setLoc({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  const onError = (error) => {
    setError(error.message);
  };

  useEffect(() => {
    const browserGeoLoc = navigator.geolocation;

    if (!browserGeoLoc) {
      setError("Browser Geolocation is not supported.");
      return;
    }

    const watcher = browserGeoLoc.getCurrentPosition(onChange, onError);
  }, [loading]);

  return { loc, error };
};

export default useBrowserLocation;
