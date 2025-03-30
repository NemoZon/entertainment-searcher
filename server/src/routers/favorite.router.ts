import express from 'express';
import * as favoriteController from '../controllers/favorite.controller';

const router = express.Router();

/**
 * @openapi
 * /favorites:
 *   get:
 *     summary: Liste tous les favoris
 *     tags:
 *       - Favorites
 *     responses:
 *       200:
 *         description: Liste des favoris
 */
router.get('/', favoriteController.getAllFavorites);

/**
 * @openapi
 * /favorites/{id}:
 *   get:
 *     summary: Récupère un favori par son ID
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du favori
 *     responses:
 *       200:
 *         description: Favori trouvé
 *       404:
 *         description: Favori non trouvé
 */
router.get('/:id', favoriteController.getFavoriteById);

/**
 * @openapi
 * /favorites/user/{userId}:
 *   get:
 *     summary: Récupère les favoris d'un utilisateur
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des favoris de l'utilisateur
 */
router.get('/user/:userId', favoriteController.getUserFavorites);

/**
 * @openapi
 * /favorites:
 *   post:
 *     summary: Crée un nouveau favori
 *     tags:
 *       - Favorites
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *               event_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Favori créé
 */
router.post('/', favoriteController.createFavorite);

/**
 * @openapi
 * /favorites/{id}:
 *   delete:
 *     summary: Supprime un favori
 *     tags:
 *       - Favorites
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du favori
 *     responses:
 *       204:
 *         description: Supprimé avec succès
 */
router.delete('/:id', favoriteController.deleteFavorite);

export default router;