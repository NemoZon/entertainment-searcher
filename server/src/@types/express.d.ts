import { Auth0UserPayload } from './auth0';

declare namespace Express {
  export interface Request {
    auth?: Auth0UserPayload;
  }
}
