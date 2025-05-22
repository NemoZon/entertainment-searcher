import { NextFunction, Request, Response } from 'express';
import * as userService from '../services/user.service';
import { Auth0UserPayload } from '../@types/auth0';

interface AuthRequest extends Request {
  auth?: Auth0UserPayload;
}

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const user = await userService.getUserById(req.params.id);
  if (user) res.json(user);
  else res.status(404).json({ message: 'User not found' });
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const updated = await userService.updateUser(req.params.id, req.body);
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  await userService.deleteUser(req.params.id);
  res.status(204).end();
};

export const syncUser = async (req: AuthRequest, res: Response) => {
  console.log('Payload reçu depuis Auth0 :', req.auth);

  const { sub, email, given_name, family_name } = req.auth!;

  
  const user = await userService.upsertUser({
    auth0_id: sub!,
    email: email!,
    firstName: given_name || '',
    lastName: family_name || '',
  });

  res.status(200).json(user);
};

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    console.log('Registering user:', email, password);
    
    const userData = await userService.registration(email, password);

    res.cookie('refreshToken', userData.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false // ONLY FOR HTTPS SERVERS
    });
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
}