// features/preferenceSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Preference } from '../types/Preference';
import { savePreferences } from './preferenceActions';
import { BaseReducerState } from '../types/Reducer';

type PreferenceState = {
  preferences: Preference[];
} & BaseReducerState;

const initialState: PreferenceState = {
  preferences: [],
  loading: false,
  error: '',
  status: 0,
};

const preferenceSlice = createSlice({
  name: 'preference',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(savePreferences.pending, state => {
        state.loading = true;
        state.error = '';
        state.status = 0;
      })
      .addCase(savePreferences.fulfilled, (state, action) => {
        state.loading = false;
        state.preferences = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(savePreferences.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
        state.status = action.payload?.status || 500;
      });
  },
});

export default preferenceSlice.reducer;
