import { Request, Response } from 'express';
import * as preferenceService from '../services/preference.service';

export const getAllPreferences = async (_req: Request, res: Response) => {
  const preferences = await preferenceService.getAllPreferences();
  res.json(preferences);
};

export const getPreferenceById = async (req: Request, res: Response) => {
  const preference = await preferenceService.getPreferenceById(req.params.id);
  if (preference) res.json(preference);
  else res.status(404).json({ message: 'Preference not found' });
};

export const getUserPreferences = async (req: Request, res: Response) => {
  const preferences = await preferenceService.getUserPreferences(req.params.userId);
  res.json(preferences);
};

export const createPreference = async (req: Request, res: Response) => {
  const preference = await preferenceService.createPreference(req.body);
  res.status(201).json(preference);
};

export const updatePreference = async (req: Request, res: Response) => {
  const updated = await preferenceService.updatePreference(req.params.id, req.body);
  res.json(updated);
};

export const deletePreference = async (req: Request, res: Response) => {
  await preferenceService.deletePreference(req.params.id);
  res.status(204).end();
};