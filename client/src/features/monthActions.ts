// features/monthActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReducerResponse, ReducerError } from '../types/Reducer';

export const fetchMonths = createAsyncThunk<
  ReducerResponse<{ months: string[] }>,
  void,
  { rejectValue: ReducerError }
>(
  'month/fetchMonths',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/months');
      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue({
          message: error.message || 'Erreur API',
          status: response.status,
        });
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);

export const saveMonths = createAsyncThunk<
  ReducerResponse<{ months: string[] }>,
  { userId: string; months: string[] },
  { rejectValue: ReducerError }
>(
  'month/saveMonths',
  async ({ userId, months }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/months', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, months }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue({
          message: error.message || 'Erreur API',
          status: response.status,
        });
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);
