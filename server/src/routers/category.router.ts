import express from 'express';
import * as categoryController from '../controllers/category.controller';

const router = express.Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Récupère toutes les catégories
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: Liste des catégories
 */
router.get('/', categoryController.getAllCategories);

/**
 * @openapi
 * /categories/{id}:
 *   get:
 *     summary: Récupère une catégorie par son ID
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       200:
 *         description: Catégorie trouvée
 *       404:
 *         description: Catégorie non trouvée
 */
router.get('/:id', categoryController.getCategoryById);

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Crée une nouvelle catégorie
 *     tags:
 *       - Categories
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sport
 *     responses:
 *       201:
 *         description: Catégorie créée
 */
router.post('/', categoryController.createCategory);

/**
 * @openapi
 * /categories/{id}:
 *   put:
 *     summary: Met à jour une catégorie existante
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Catégorie mise à jour
 */
router.put('/:id', categoryController.updateCategory);

/**
 * @openapi
 * /categories/{id}:
 *   delete:
 *     summary: Supprime une catégorie
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la catégorie
 *     responses:
 *       204:
 *         description: Catégorie supprimée
 */
router.delete('/:id', categoryController.deleteCategory);

export default router;
