// features/eventSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { Event } from '../types/Event';
import { fetchEvents, saveEvents } from './eventActions';
import { BaseReducerState } from '../types/Reducer';

type EventState = {
  events: Event[];
  savedEventIds: number[];
} & BaseReducerState;

const initialState: EventState = {
  events: [],
  savedEventIds: [],
  loading: false,
  error: '',
  status: 0,
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.status = 0;
        state.error = '';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.data.events;
        state.status = action.payload.status;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
        state.status = action.payload?.status || 500;
      })

      // SAVE
      .addCase(saveEvents.fulfilled, (state, action) => {
        state.savedEventIds = action.meta.arg.eventIds;
      });
  },
});

export default eventSlice.reducer;
