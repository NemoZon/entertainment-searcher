export interface Auth0UserPayload {
  sub: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}
