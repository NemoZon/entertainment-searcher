// features/eventActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReducerError, ReducerResponse } from '../types/Reducer';
import { Event } from '../types/Event';

// Récupération des événements en fonction de la ville et des mois
export const fetchEvents = createAsyncThunk<
  ReducerResponse<{ events: Event[] }>,
  { city: string; months: string[] },
  { rejectValue: ReducerError }
>(
  'event/fetchEvents',
  async ({ city, months }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, months }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue({ message: error.message, status: response.status });
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      return rejectWithValue({ message: 'Erreur réseau', status: 500 });
    }
  }
);

// Enregistrement des événements sélectionnés pour un utilisateur
export const saveEvents = createAsyncThunk<
  ReducerResponse<{ success: boolean }>,
  { userId: string; eventIds: number[] },
  { rejectValue: ReducerError }
>(
  'event/saveEvents',
  async ({ userId, eventIds }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/events/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, eventIds }),
      });

      if (!response.ok) {
        const error = await response.json();
        return rejectWithValue({ message: error.message, status: response.status });
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      return rejectWithValue({ message: 'Erreur lors de l’enregistrement', status: 500 });
    }
  }
);
