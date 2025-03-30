import { Request, Response } from 'express';
import * as favoriteService from '../services/favorite.service';

export const getAllFavorites = async (_req: Request, res: Response) => {
  const favorites = await favoriteService.getAllFavorites();
  res.json(favorites);
};

export const getFavoriteById = async (req: Request, res: Response) => {
  const favorite = await favoriteService.getFavoriteById(req.params.id);
  if (favorite) res.json(favorite);
  else res.status(404).json({ message: 'Favorite not found' });
};

export const getUserFavorites = async (req: Request, res: Response) => {
  const favorites = await favoriteService.getUserFavorites(req.params.userId);
  res.json(favorites);
};

export const createFavorite = async (req: Request, res: Response) => {
  const favorite = await favoriteService.createFavorite(req.body);
  res.status(201).json(favorite);
};

export const deleteFavorite = async (req: Request, res: Response) => {
  await favoriteService.deleteFavorite(req.params.id);
  res.status(204).end();
};