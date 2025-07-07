// features/locationActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReducerError, ReducerResponse } from '../types/Reducer';
import { Location } from '../types/Location';

export const fetchLocations = createAsyncThunk<
  ReducerResponse<{ cities: string[] }>,
  void,
  { rejectValue: ReducerError }
>(
  'location/fetchLocations',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('http://10.0.2.2:3000/api/locations');
      const json = await res.json();

      if (!res.ok) {
        return rejectWithValue({
          message: json.message || 'Erreur serveur',
          status: res.status,
        });
      }

      return {
        data: { cities: json.map((item: any) => item.city) },
        status: res.status,
      };
    } catch {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);

export const saveLocation = createAsyncThunk<
  ReducerResponse<Location>,
  { userId: string; city: string },
  { rejectValue: ReducerError }
>(
  'location/saveLocation',
  async ({ userId, city }, { rejectWithValue }) => {
    try {
      const res = await fetch('http://10.0.2.2:3000/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, city }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue({
          message: data.message || 'Erreur serveur',
          status: res.status,
        });
      }

      return { data, status: res.status };
    } catch {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);
