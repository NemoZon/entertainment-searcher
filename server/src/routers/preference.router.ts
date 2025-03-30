import express from 'express';
import * as preferenceController from '../controllers/preference.controller';

const router = express.Router();

/**
 * @openapi
 * /preferences:
 *   get:
 *     summary: Liste toutes les préférences
 *     tags:
 *       - Preferences
 *     responses:
 *       200:
 *         description: Liste des préférences
 */
router.get('/', preferenceController.getAllPreferences);

/**
 * @openapi
 * /preferences/{id}:
 *   get:
 *     summary: Récupère une préférence par son ID
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la préférence
 *     responses:
 *       200:
 *         description: Préférence trouvée
 *       404:
 *         description: Préférence non trouvée
 */
router.get('/:id', preferenceController.getPreferenceById);

/**
 * @openapi
 * /preferences/user/{userId}:
 *   get:
 *     summary: Récupère les préférences d'un utilisateur
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des préférences de l'utilisateur
 */
router.get('/user/:userId', preferenceController.getUserPreferences);

/**
 * @openapi
 * /preferences:
 *   post:
 *     summary: Crée une nouvelle préférence
 *     tags:
 *       - Preferences
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Préférence créée
 */
router.post('/', preferenceController.createPreference);

/**
 * @openapi
 * /preferences/{id}:
 *   put:
 *     summary: Met à jour une préférence existante
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la préférence
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Préférence mise à jour
 */
router.put('/:id', preferenceController.updatePreference);

/**
 * @openapi
 * /preferences/{id}:
 *   delete:
 *     summary: Supprime une préférence
 *     tags:
 *       - Preferences
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la préférence
 *     responses:
 *       204:
 *         description: Supprimée avec succès
 */
router.delete('/:id', preferenceController.deletePreference);

export default router;