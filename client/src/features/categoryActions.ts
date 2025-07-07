// src/features/categoryActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReducerError, ReducerResponse } from '../types/Reducer';
import { Category } from '../types/Category';

export const getCategories = createAsyncThunk<
  ReducerResponse<{ categories: Category[] }>,
  void,
  { rejectValue: ReducerError }
>('category/getCategories', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://10.0.2.2:3000/api/categories');

    const body = await response.json();

    if (!response.ok) {
      return rejectWithValue({
        message: body.message || 'Erreur serveur',
        status: response.status,
      });
    }

    return {
      data: { categories: body },
      status: response.status,
    };
  } catch (err) {
    return rejectWithValue({
      message: 'Erreur réseau',
      status: 500,
    });
  }
});
