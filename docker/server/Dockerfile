FROM node:18-alpine

# Crée un dossier de travail propre
WORKDIR /app

# Copie les fichiers de dépendances
COPY server/package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste de l’application
COPY server/ .

# Génération du client Prisma
RUN npx prisma generate

EXPOSE 3000

# Démarrage avec attente DB + migration + seed + nodemon
CMD sh -c "until nc -z db 5432; do echo '⏳ Attente de la base de données...'; sleep 1; done && \
  echo '✅ DB prête ! Migration...' && \
  npx prisma migrate deploy && \
  echo '🌱 Seed...' && \
  npm run seed && \
  echo '🚀 Lancement du serveur...' && \
  npm run dev"
