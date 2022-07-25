import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import geoLocationReducer from '../features/geoLocation/geoLocationSlice';
import locationBrowserReducer from '../features/locationFromBrowser/locationBrowserSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    geoLocation: geoLocationReducer,
    locationBrowser: locationBrowserReducer,
  },
});
