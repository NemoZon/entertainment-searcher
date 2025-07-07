import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReducerError, ReducerResponse } from '../types/Reducer';
import { User } from '../types/User';

/**
 * Enregistrement d'un utilisateur
 */
export const registration = createAsyncThunk<
  ReducerResponse<User>,
  { email: string; auth0_id: string; name: string },
  { rejectValue: ReducerError }
>(
  'user/registration',
  async ({ email, auth0_id, name }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          auth0_id,
          firstName: name, // 🔁 correspond au champ attendu dans Prisma
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        return rejectWithValue({
          message: body.message || 'Erreur lors de l’inscription',
          status: response.status,
        });
      }

      console.log("🧠 Réponse back complète :", body);

      return {
        data: body, // ✅ ici tu retournes directement le body (car c'est déjà l'objet User)
        status: response.status, // ✅ pas body.status, c’est `response.status` qui est correct
      };
    } catch (error) {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);

/**
 * Connexion d'un utilisateur
 */
export const login = createAsyncThunk<
  ReducerResponse<User>,
  { email: string; password: string },
  { rejectValue: ReducerError }
>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://10.0.2.2:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const body = await response.json();

      if (!response.ok) {
        return rejectWithValue({
          message: body.message || 'Erreur serveur',
          status: response.status,
        });
      }

      return {
        data: body.user,
        status: 200,
      };
    } catch (error) {
      return rejectWithValue({
        message: 'Erreur réseau',
        status: 500,
      });
    }
  }
);
