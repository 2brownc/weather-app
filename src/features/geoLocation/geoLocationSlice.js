import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: 'NOT_READY',
  error: null,
  cityInfo: {
    lat: null,
    lon: null,
    country: null,
    stateName: null,
    name: null,
  },
};

export const fetchGeoLocationInfo = createAsyncThunk(
  'geolocation/fetchGeoLocationInfo',
  async ({ lat, lon, OPEN_WEATHER_API_KEY }) => {
    const OPEN_WEATHER_GEOLOC_API_ENDPOINT = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`;

    const response = await fetch(OPEN_WEATHER_GEOLOC_API_ENDPOINT);
    return response.json();
  },
);

const geoLocationSlice = createSlice({
  name: 'geoLocation',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchGeoLocationInfo.pending, (state, action) => {
        const status = 'LOADING';

        return { ...state, status };
      })
      .addCase(fetchGeoLocationInfo.fulfilled, (state, action) => {
        const status = 'SUCCEDED';
        const {
          name,
          state: stateName,
          country,
          lat,
          lon,
        } = action.payload[0];
        const cityInfo = {
          name, stateName, country, lat, lon,
        };

        return { ...state, status, cityInfo };
      })
      .addCase(fetchGeoLocationInfo.rejected, (state, action) => {
        const status = 'FAILED';
        const error = action.error.message;

        return { ...state, status, error };
      });
  },
});

export const { getGeoLocation } = geoLocationSlice.actions;

export const geoLocationInfo = (state) => state.geoLocation.cityInfo;
export const geoLocationStatus = (state) => state.geoLocation.status;

export default geoLocationSlice.reducer;
