import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { BaseReducerState, ReducerResponse } from '../types/Reducer';
import { login, registration } from './userActions';

export type UserState = User & BaseReducerState;

const initialState: UserState = {
  id: '',
  auth0_id: '',
  email: '',
  preferences: [],
  locations: [],
  favorites: [],
  history: [],
  loading: false,
  error: '',
  status: 0,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    pending: (state) => {
      state.loading = true;
      state.status = 0;
      state.error = '';
    },
    fulfilled: (state, action: PayloadAction<ReducerResponse<User>>) => {
      state.loading = false;
      state.status = action.payload.status;
      state.error = '';
      state.id = action.payload.data.id;
      state.auth0_id = action.payload.data.auth0_id;
      state.email = action.payload.data.email;
      state.preferences = action.payload.data.preferences;
      state.locations = action.payload.data.locations;
      state.favorites = action.payload.data.favorites;
      state.history = action.payload.data.history;
    },
    rejected: (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.error = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(login.pending, (state) => {
      userSlice.caseReducers.pending(state);
    })
    .addCase(login.fulfilled, (state, action) => {
      userSlice.caseReducers.fulfilled(state, action);
    })
    .addCase(login.rejected, (state, action) => {
      userSlice.caseReducers.rejected(state, action);
    })
    .addCase(registration.pending, (state) => {
      userSlice.caseReducers.pending(state);
    })
    .addCase(registration.fulfilled, (state, action) => {
      userSlice.caseReducers.fulfilled(state, action);
    })
    .addCase(registration.rejected, (state, action) => {
      userSlice.caseReducers.rejected(state, action);
    });
  },
});

export const { pending, fulfilled, rejected } = userSlice.actions;

const userReducer = userSlice.reducer;

export default userReducer;
