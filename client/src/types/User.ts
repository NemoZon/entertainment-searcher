export type User = {
  id: string,
  auth0_id: string,
  email: string,
  lastName?: string,
  firstName?: string,
  created_at?: string,
  updated_at?: string,
  last_login?: string,
  preferences: string[],
  locations: string[],
  favorites: string[],
  history: string[],
};
