import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  status: null,
  errorMessage: null,
  location: null,
  error: null,
};

export const getLocationFromIP = createAsyncThunk(
  'locationFromIP/getLocationFromIP',
  async ({ IPDATA_KEY }) => {
    const IPDATA_API_ENDPOINT = `https://api.ipdata.co/?api-key=${IPDATA_KEY}`;
    const response = await fetch(IPDATA_API_ENDPOINT);

    return response.json();
  },
);

const locationFromIPSlice = createSlice({
  name: 'locationFromIP',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLocationFromIP.pending, (state) => {
        const status = 'LOADING';

        return {
          ...state,
          status,
        };
      })
      .addCase(getLocationFromIP.fulfilled, (state, action) => {
        const status = 'SUCCEDED';

        const { latitude, longitude } = action.payload;
        const location = { latitude, longitude };

        return {
          ...state,
          status,
          location,
        };
      })
      .addCase(getLocationFromIP.rejected, (state, action) => {
        const status = 'FAILED';
        const error = action.error.message;
        return {
          ...state,
          status,
          error,
        };
      });
  },
});

export default locationFromIPSlice.reducer;

export const locationFromIP = (state) => state.locationFromIP.location;
export const locationFromIPStatus = (state) => state.locationFromIP.status;
