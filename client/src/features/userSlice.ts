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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.status = 0;
        state.error = '';
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<ReducerResponse<User>>) => {
        const user = action.payload.data;
        state.loading = false;
        state.status = action.payload.status;
        state.error = '';
        state.id = user.id;
        state.auth0_id = user.auth0_id;
        state.email = user.email;
        state.preferences = user.preferences;
        state.locations = user.locations;
        state.favorites = user.favorites;
        state.history = user.history;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload?.status || 500;
        state.error = action.payload?.message || 'Erreur inconnue';
      })

      // ✅ Ajout du log ici pour debug
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.status = 0;
        state.error = '';
      })
      .addCase(registration.fulfilled, (state, action: PayloadAction<ReducerResponse<User>>) => {
        console.log("🧩 registration.fulfilled reçu :", action.payload);

        const user = action.payload.data;
        state.loading = false;
        state.status = action.payload.status;
        state.error = '';
        state.id = user.id;
        state.auth0_id = user.auth0_id;
        state.email = user.email;
        state.preferences = user.preferences;
        state.locations = user.locations;
        state.favorites = user.favorites;
        state.history = user.history;
      })
      .addCase(registration.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.status = action.payload?.status || 500;
        state.error = action.payload?.message || 'Erreur inconnue';
      });
  },
});

export default userSlice.reducer;
