import { createAsyncThunk } from '@reduxjs/toolkit';
import { Preference } from '../types/Preference';
import { ReducerError, ReducerResponse } from '../types/Reducer';

export const savePreferences = createAsyncThunk<
  ReducerResponse<Preference[]>,
  { userId: string; preferences: string[] },
  { rejectValue: ReducerError }
>(
  'preference/savePreferences',
  async ({ userId, preferences }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, preferences })
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue({
          message: error.message || 'Erreur serveur',
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
