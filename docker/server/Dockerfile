FROM node:18-alpine

WORKDIR /app

# Installation des dépendances
COPY server/package.json server/package-lock.json ./
RUN npm install

# Copie du code source
COPY server/ .

# Génération du client Prisma
RUN npx prisma generate

# Exposition du port
EXPOSE 3000

# Démarrage avec initialisation DB + seed + serveur
CMD sh -c "until nc -z db 5432; do echo '⏳ Attente de la base de données...'; sleep 1; done && \
  echo '✅ DB prête ! Migration...' && \
  npx prisma migrate deploy && \
  echo 'Seed...' && \
  npm run seed && \
  echo '🚀 Lancement du serveur...' && \
  npm run dev"
