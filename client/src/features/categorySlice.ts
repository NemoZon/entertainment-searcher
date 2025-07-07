// src/features/categorySlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types/Category';
import {  ReducerResponse } from '../types/Reducer';
import { getCategories } from './categoryActions';

type CategoryState = {
  categories: Category[];
  loading: boolean;
  error: string;
  status: number;
};

const initialState: CategoryState = {
  categories: [],
  loading: false,
  error: '',
  status: 0,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.status = 0;
      })
      .addCase(
        getCategories.fulfilled,
        (state, action: PayloadAction<ReducerResponse<{ categories: Category[] }>>) => {
          state.loading = false;
          state.categories = action.payload.data.categories;
          state.status = action.payload.status;
        }
      )
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur inconnue';
        state.status = action.payload?.status || 500;
      });
  },
});

export default categorySlice.reducer;
