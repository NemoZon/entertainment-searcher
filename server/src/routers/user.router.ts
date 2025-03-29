import express from 'express';
import * as userController from '../controllers/user.controller';
import { checkJwt } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Liste tous les utilisateurs
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Liste des utilisateurs
 */
router.get('/', userController.getAllUsers);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Récupère un utilisateur par son ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Utilisateur trouvé
 *       404:
 *         description: Utilisateur non trouvé
 */
router.get('/:id', userController.getUserById);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               auth0_id:
 *                 type: string
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Utilisateur créé
 */
router.post('/', userController.createUser);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Met à jour un utilisateur existant
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur mis à jour
 */
router.put('/:id', userController.updateUser);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       204:
 *         description: Supprimé avec succès
 */
router.delete('/:id', userController.deleteUser);

/**
 * @openapi
 * /users/sync:
 *   post:
 *     summary: Synchronise l'utilisateur Auth0 (auto-enregistrement)
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: Utilisateur synchronisé
 *       401:
 *         description: Non autorisé
 */
router.post('/sync', checkJwt, userController.syncUser);

export default router;
