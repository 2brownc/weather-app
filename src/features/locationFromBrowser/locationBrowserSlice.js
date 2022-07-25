import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLocationFromBrowser = createAsyncThunk(
  'locationBrowser/fetchLocationBrowser',
  async (reponse) => reponse,
);

export const fetchLocationFromBrowserError = createAsyncThunk(
  'locationBrowser/fetchLocationBrowserError',
  async (response) => response,
);

const initialState = {
  status: null,
  errorMessage: null,
  location: null,
};

const locationBrowserSlice = createSlice({
  name: 'locationBrowser',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLocationFromBrowser.pending, (state, action) => {
        const status = 'LOADING';

        return {
          ...state,
          status,
        };
      })
      .addCase(fetchLocationFromBrowser.fulfilled, (state, action) => {
        const status = 'SUCCEDED';
        const {
          latitude,
          longitude,
        } = action.payload.coords;

        const location = { latitude, longitude };

        return {
          ...state,
          status,
          location,
        };
      })
      .addCase(fetchLocationFromBrowserError.fulfilled, (state, action) => {
        const status = 'FAILED';
        const errorMessage = action.payload.message;

        return {
          ...state,
          status,
          errorMessage,
        };
      });
  },
});

export default locationBrowserSlice.reducer;

export const locationFromBrowser = (state) => state.locationBrowser.location;
export const locationFromBrowserStatus = (state) => state.locationBrowser.status;
