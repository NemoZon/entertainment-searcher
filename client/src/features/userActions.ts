import { createAsyncThunk } from '@reduxjs/toolkit';
import { isReducerError, ReducerError, ReducerResponse } from '../types/Reducer';
import { User } from '../types/User';
import { users } from '../mocks/users';

export const registration = createAsyncThunk<
  ReducerResponse<User>,
  { email: string; password: string, name: string },
  { rejectValue: ReducerError }
>(
  'user/registration',
  async (
    { email, password, name }: { email: string; password: string, name: string },
    { rejectWithValue },
  ): Promise<ReducerResponse<User>> => {
    try {
      const response = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          if (users.find((u) => u.email === email)) {
            return reject({ message: 'User already exists', status: 400 });
          }
          const user = {
            id: '1',
            auth0_id: password,
            email,
            lastName: name,
            preferences: [],
            locations: [],
            favorites: [],
            history: [],
          };
          users.push(user);
          resolve(user);
        }, 1000);
      });
      return { data: response, status: 201 };
    } catch (error) {
      throw rejectWithValue({
        message: 'Unexpected error',
        status: 500,
      });
    }
  },
);

export const login = createAsyncThunk<
  ReducerResponse<User>,
  { email: string; password: string },
  { rejectValue: ReducerError }
>(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ): Promise<ReducerResponse<User>> => {
    try {
      const response = await new Promise<User>((resolve, reject) => {
        setTimeout(() => {
          const user = users.find((u) => u.email === email && u.auth0_id === password);
          if (user) {
            resolve(user);
          } else {
            reject({ message: 'User not found', status: 404 });
          }
        }, 1000);
      });

      return { data: response, status: 201 };
    } catch (error) {
      if (isReducerError(error)) {
        throw rejectWithValue({
          message: error?.message ? error?.message : 'Unexpected error',
          status: error?.status ? error?.status : 500,
        });
      }
      throw rejectWithValue({
        message: 'Unexpected error',
        status: 500,
      });
    }
  },
);
