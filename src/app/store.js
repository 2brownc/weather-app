import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../features/weather/weatherSlice';

export default configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
