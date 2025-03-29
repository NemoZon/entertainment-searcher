import express from 'express';
import * as eventController from '../controllers/event.controller';

const router = express.Router();

/**
 * @openapi
 * /events/fetch:
 *   post:
 *     summary: Récupère des événements depuis l'API AWS (non stockés en base)
 *     tags:
 *       - Events
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Paramètres de filtrage à transmettre à l'API AWS
 *             example:
 *               city: Paris
 *               category: Musique
 *     responses:
 *       200:
 *         description: Liste des événements récupérés
 *       500:
 *         description: Erreur lors de la récupération des événements
 */
router.post('/fetch', eventController.fetchEvents);

export default router;
