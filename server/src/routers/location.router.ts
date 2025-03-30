import express from 'express';
import * as locationController from '../controllers/location.controller';

const router = express.Router();

/**
 * @openapi
 * /locations:
 *   get:
 *     summary: Liste toutes les localisations
 *     tags:
 *       - Locations
 *     responses:
 *       200:
 *         description: Liste des localisations
 */
router.get('/', locationController.getAllLocations);

/**
 * @openapi
 * /locations/{id}:
 *   get:
 *     summary: Récupère une localisation par son ID
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la localisation
 *     responses:
 *       200:
 *         description: Localisation trouvée
 *       404:
 *         description: Localisation non trouvée
 */
router.get('/:id', locationController.getLocationById);

/**
 * @openapi
 * /locations/user/{userId}:
 *   get:
 *     summary: Récupère les localisations d'un utilisateur
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des localisations de l'utilisateur
 */
router.get('/user/:userId', locationController.getUserLocations);

/**
 * @openapi
 * /locations:
 *   post:
 *     summary: Crée une nouvelle localisation
 *     tags:
 *       - Locations
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *               user_id:
 *                 type: string
 *     responses:
 *       201:
 *         description: Localisation créée
 */
router.post('/', locationController.createLocation);

/**
 * @openapi
 * /locations/{id}:
 *   put:
 *     summary: Met à jour une localisation existante
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la localisation
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *               postal_code:
 *                 type: string
 *               country:
 *                 type: string
 *     responses:
 *       200:
 *         description: Localisation mise à jour
 */
router.put('/:id', locationController.updateLocation);

/**
 * @openapi
 * /locations/{id}:
 *   delete:
 *     summary: Supprime une localisation
 *     tags:
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la localisation
 *     responses:
 *       204:
 *         description: Supprimée avec succès
 */
router.delete('/:id', locationController.deleteLocation);

export default router;