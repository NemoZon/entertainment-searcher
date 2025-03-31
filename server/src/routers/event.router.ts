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
 *               ville: Reims
 *               interet: ["..."]
 *     responses:
 *       200:
 *         description: Liste des événements récupérés
 *       500:
 *         description: Erreur lors de la récupération des événements
 */
router.post('/fetch', eventController.fetchEvents);

/**
 * @openapi
 * /events:
 *   get:
 *     summary: Liste tous les événements avec filtres optionnels
 *     tags:
 *       - Events
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtre par catégorie
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: Filtre par lieu
 *     responses:
 *       200:
 *         description: Liste des événements
 */
router.get('/', eventController.getAllEvents);

/**
 * @openapi
 * /events/{id}:
 *   get:
 *     summary: Récupère un événement par son ID
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     responses:
 *       200:
 *         description: Événement trouvé
 *       404:
 *         description: Événement non trouvé
 */
router.get('/:id', eventController.getEventById);

/**
 * @openapi
 * /events:
 *   post:
 *     summary: Crée un nouvel événement
 *     tags:
 *       - Events
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ticketmaster_id:
 *                 type: string
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               price_min:
 *                 type: number
 *               price_max:
 *                 type: number
 *               ticket_url:
 *                 type: string
 *               remaining_places:
 *                 type: integer
 *               image_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Événement créé
 */
router.post('/', eventController.createEvent);

/**
 * @openapi
 * /events/{id}:
 *   put:
 *     summary: Met à jour un événement existant
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               location:
 *                 type: string
 *               price_min:
 *                 type: number
 *               price_max:
 *                 type: number
 *               ticket_url:
 *                 type: string
 *               remaining_places:
 *                 type: integer
 *               image_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Événement mis à jour
 */
router.put('/:id', eventController.updateEvent);

/**
 * @openapi
 * /events/{id}:
 *   delete:
 *     summary: Supprime un événement
 *     tags:
 *       - Events
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'événement
 *     responses:
 *       204:
 *         description: Supprimé avec succès
 */
router.delete('/:id', eventController.deleteEvent);

export default router;
