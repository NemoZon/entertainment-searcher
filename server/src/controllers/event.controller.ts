import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export const fetchEvents = async (req: Request, res: Response) => {
  try {
    const rawEvents = await eventService.fetchExternalEvents(req.body);

    const formattedEvents = rawEvents.map((event: any) => {
      const place = event.place?.[0];
      const price = event.priceRanges?.[0];
      const domain = event.domain?.[0];

      return {
        ticketmaster_id: event.id,
        name: event.name,
        category: domain?.genre?.name || domain?.segment?.name || 'Autre',
        date: new Date(event.date),
        location: `${place?.address?.line1 || ''}, ${place?.postalCode || ''} ${place?.city?.name || ''}, ${place?.country?.name || ''}`.trim(),
        price_min: price?.min || null,
        price_max: price?.max || null,
        ticket_url: event.ticket,
        remaining_places: place?.upcomingEvents?._total || null,
        image_url: place?.images?.[0]?.url || null,
      };
    });

    res.json(formattedEvents);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements :', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};
