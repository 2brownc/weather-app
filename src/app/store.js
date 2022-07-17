import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';
import geoLocationReducer from '../features/geoLocation/geoLocationSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
    geoLocation: geoLocationReducer,
  },
});
