import { Request, Response } from 'express';
import * as eventService from '../services/event.service';

export const fetchEvents = async (req: Request, res: Response) => {
  try {
    const rawEvents = await eventService.fetchExternalEvents(req.body);

    const formattedEvents = rawEvents.map((event: any) => {
      const place = event.place?.[0];
      const price = event.priceRanges?.[0];
      const domain = event.domain?.[0];

      const categoryName = domain?.genre?.name || domain?.segment?.name || 'Autre';
      
      return {
        ticketmaster_id: event.id,
        name: event.name,
        category: categoryName,
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

export const getAllEvents = async (req: Request, res: Response) => {
  const { category, location } = req.query;
  
  const where: any = {};
  
  if (category) {
    where.category = {
      name: {
        equals: category as string,
        mode: 'insensitive'
      }
    };
  }
  
  if (location) {
    where.location = {
      contains: location as string,
      mode: 'insensitive'
    };
  }
  
  const events = await eventService.getAllEvents(where);
  res.json(events);
};

export const getEventById = async (req: Request, res: Response) => {
  const event = await eventService.getEventById(req.params.id);
  if (event) res.json(event);
  else res.status(404).json({ message: 'Event not found' });
};

export const createEvent = async (req: Request, res: Response) => {
  const event = await eventService.createEvent(req.body);
  res.status(201).json(event);
};

export const updateEvent = async (req: Request, res: Response) => {
  const updated = await eventService.updateEvent(req.params.id, req.body);
  res.json(updated);
};

export const deleteEvent = async (req: Request, res: Response) => {
  await eventService.deleteEvent(req.params.id);
  res.status(204).end();
};
