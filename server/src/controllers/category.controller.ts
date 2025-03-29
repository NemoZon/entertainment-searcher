import { Request, Response } from 'express';
import * as categoryService from '../services/category.service';

export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.json(categories);
};

export const getCategoryById = async (req: Request, res: Response) => {
  const category = await categoryService.getCategoryById(req.params.id);
  if (category) res.json(category);
  else res.status(404).json({ message: 'Catégorie non trouvée' });
};

// export const createCategory = async (req: Request, res: Response) => {
//   const newCategory = await categoryService.createCategory(req.body);
//   res.status(201).json(newCategory);
// };

// export const updateCategory = async (req: Request, res: Response) => {
//   const updated = await categoryService.updateCategory(req.params.id, req.body);
//   res.json(updated);
// };

export const deleteCategory = async (req: Request, res: Response) => {
  await categoryService.deleteCategory(req.params.id);
  res.status(204).end();
};
