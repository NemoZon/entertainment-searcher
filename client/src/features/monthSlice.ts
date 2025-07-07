import { createSlice } from '@reduxjs/toolkit';
import { BaseReducerState } from '../types/Reducer';
import { fetchMonths, saveMonths } from './monthActions';

type MonthState = {
  months: string[]; // liste récupérée depuis le backend
  selectedMonths: string[]; // mois choisis par l'utilisateur
} & BaseReducerState;

const initialState: MonthState = {
  months: [],
  selectedMonths: [],
  loading: false,
  error: '',
  status: 0,
};

const monthSlice = createSlice({
  name: 'month',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // FETCH MONTHS
      .addCase(fetchMonths.pending, state => {
        state.loading = true;
        state.error = '';
        state.status = 0;
      })
      .addCase(fetchMonths.fulfilled, (state, action) => {
        state.loading = false;
        state.months = action.payload.data.months;
        state.status = action.payload.status;
      })
      .addCase(fetchMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
        state.status = action.payload?.status || 500;
      })

      // SAVE MONTHS
      .addCase(saveMonths.pending, state => {
        state.loading = true;
        state.error = '';
        state.status = 0;
      })
      .addCase(saveMonths.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedMonths = action.payload.data.months;
        state.status = action.payload.status;
      })
      .addCase(saveMonths.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
        state.status = action.payload?.status || 500;
      });
  },
});

export default monthSlice.reducer;
