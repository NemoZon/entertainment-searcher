import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

export const generateTokens = (payload: User): {
  accessToken: string;
  refreshToken: string;
} => {
  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_SECRET ?? 'dev_access_secret',
    {
      expiresIn: '300d' // change to 30m
    }
  );

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_SECRET ?? 'dev_refresh_secret',
    {
      expiresIn: '30d'
    }
  );

  return {
    accessToken,
    refreshToken
  };
}

export const validateAccessToken = (token: string): User | null => {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET is not defined in .env file');
  }
  return jwt.verify(token, secret) as User;
}

export const validateRefreshToken = (token: string): User | null => {
  const refresh = process.env.JWT_REFRESH_SECRET;
  if (!refresh) {
    throw new Error('JWT_REFRESH_SECRET is not defined in .env file');
  }
  return jwt.verify(token, refresh) as User;
}

export default {
  generateTokens,
  validateAccessToken,
  validateRefreshToken
}