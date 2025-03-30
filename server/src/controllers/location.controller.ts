import { Request, Response } from 'express';
import * as locationService from '../services/location.service';

export const getAllLocations = async (_req: Request, res: Response) => {
  const locations = await locationService.getAllLocations();
  res.json(locations);
};

export const getLocationById = async (req: Request, res: Response) => {
  const location = await locationService.getLocationById(req.params.id);
  if (location) res.json(location);
  else res.status(404).json({ message: 'Location not found' });
};

export const getUserLocations = async (req: Request, res: Response) => {
  const locations = await locationService.getUserLocations(req.params.userId);
  res.json(locations);
};

export const createLocation = async (req: Request, res: Response) => {
  const location = await locationService.createLocation(req.body);
  res.status(201).json(location);
};

export const updateLocation = async (req: Request, res: Response) => {
  const updated = await locationService.updateLocation(req.params.id, req.body);
  res.json(updated);
};

export const deleteLocation = async (req: Request, res: Response) => {
  await locationService.deleteLocation(req.params.id);
  res.status(204).end();
};