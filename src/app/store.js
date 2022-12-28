import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import geoLocationReducer from '../features/geoLocation/geoLocationSlice';
import locationFromBrowserReducer from '../features/locationFromBrowser/locationFromBrowserSlice';
import locationFromIPReducer from '../features/getLocationFromIP/getLocationFromIPSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    geoLocation: geoLocationReducer,
    locationFromBrowser: locationFromBrowserReducer,
    locationFromIP: locationFromIPReducer,
  },
});
