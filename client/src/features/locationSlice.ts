// features/locationSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Location } from '../types/Location';
import { BaseReducerState } from '../types/Reducer';
import { fetchLocations, saveLocation } from './locationActions';

type LocationState = {
  locations: Location[];
  selectedLocation: Location | null;
} & BaseReducerState;

const initialState: LocationState = {
  locations: [],
  selectedLocation: null,
  loading: false,
  error: '',
  status: 0,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLocations.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload.data.cities.map((city: string, index: number) => ({
          id: String(index),
          city,
          user_id: '',
        }));
        state.status = action.payload.status;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
      })
      .addCase(saveLocation.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(saveLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLocation = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(saveLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
      });
  },
});

export default locationSlice.reducer;
