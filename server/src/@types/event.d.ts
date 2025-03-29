export interface NormalizedEvent {
    ticketmaster_id: string;
    name: string;
    category: string;
    category_id: string | null;
    date: Date;
    location: string;
    price_min: number | null;
    price_max: number | null;
    ticket_url: string;
    remaining_places: number | null;
    image_url: string | null;
  }
  