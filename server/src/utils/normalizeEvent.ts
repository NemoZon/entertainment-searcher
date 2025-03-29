import { NormalizedEvent } from 'src/@types/event';

export function normalizeEvent(
  rawEvent: any,
  category_id: string
): NormalizedEvent {
  const place = rawEvent.place?.[0];
  const price = rawEvent.priceRanges?.[0];
  const domain = rawEvent.domain?.[0];

  const locationParts = [
    place?.address?.line1,
    place?.postalCode,
    place?.city?.name,
    place?.country?.name,
  ].filter(Boolean);

  const categoryName = domain?.genre?.name || domain?.segment?.name || 'Autre';

  return {
    ticketmaster_id: rawEvent.id,
    name: rawEvent.name,
    category: categoryName,
    category_id,
    date: new Date(rawEvent.date),
    location: locationParts.join(', '),
    price_min: price?.min ?? null,
    price_max: price?.max ?? null,
    ticket_url: rawEvent.ticket,
    remaining_places: place?.upcomingEvents?._total ?? null,
    image_url: place?.images?.[0]?.url ?? null,
  };
}
