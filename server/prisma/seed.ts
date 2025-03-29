import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

const TICKETMASTER_API_URL =
  'https://app.ticketmaster.com/discovery/v2/classifications.json';
const API_KEY = process.env.TICKETMASTER_API_KEY;

const segmentTranslations: Record<string, string> = {
  Music: 'Musique',
  Sports: 'Sport',
  'Arts & Theatre': 'Arts et Théâtre',
  Film: 'Cinéma',
  Comedy: 'Comédie',
  Dance: 'Danse',
  Miscellaneous: 'Divers',
  Undefined: 'Autre',
};

async function getTicketmasterSegments(): Promise<string[]> {
  const response = await axios.get(TICKETMASTER_API_URL, {
    params: {
      apikey: API_KEY,
      locale: '*',
    },
  });

  const classifications = response.data._embedded?.classifications || [];

  const segmentsSet = new Set<string>();

  classifications.forEach((item: any) => {
    if (item.segment?.name) {
      segmentsSet.add(item.segment.name);
    }
  });

  return Array.from(segmentsSet);
}

async function main() {
  // Supprime toutes les catégories avant d'insérer
  await prisma.category.deleteMany();
  const segments = await getTicketmasterSegments();

  for (const segment of segments) {
    const translated = segmentTranslations[segment] || segment;

    await prisma.category.upsert({
      where: { name: translated },
      update: {},
      create: { name: translated },
    });
  }

  console.log('Catégories Ticketmaster insérées');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
