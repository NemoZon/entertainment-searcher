import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  'Musique',
  'Sport',
  'Arts',
  'Théâtre',
  'Cinéma',
  'Comédie',
  'Danse',
  'Concerts',
];

async function main() {
  // Supprime toutes les catégories existantes
  await prisma.category.deleteMany();

  // Insère les catégories définies en dur
  for (const name of categories) {
    await prisma.category.create({
      data: { name },
    });
  }

  console.log('✅ Catégories insérées avec succès !');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l’insertion des catégories :', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
