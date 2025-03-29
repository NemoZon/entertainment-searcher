# FYD API

API REST construite avec Express, TypeScript, Prisma, PostgreSQL, et sécurisée avec Auth0.

---

## Sommaire

- [Prérequis](#prérequis)
- [Installation](#installation)
- [Configuration](#configuration)
- [Commandes](#commandes)
- [Structure du projet](#structure-du-projet)
- [Documentation de l'API](#documentation-de-lapi)
- [Sécurité](#sécurité)
- [Licences](#licences)

---

## Prérequis

- Node.js v18+
- PostgreSQL installé localement ou via un service cloud (Railway, Supabase, etc.)
- Un compte [Auth0](https://auth0.com/)
- `npm` ou `yarn`

---

## Installation

1. Clonez le projet :

```bash
git clone https://github.com/NemoZon/entertainment-searcher
cd entertainment-searcher-api/server
```

2. Installez les dépendances :

```bash
npm install
```

3. Installez les dépendances de développement :

```bash
npm install --save-dev @types/swagger-jsdoc @types/swagger-ui-express ts-node typescript
```

---

## Configuration

1. Créez un fichier `.env` à la racine du dossier `server` :

```env
# PostgreSQL
DATABASE_URL=postgresql://user:password@localhost:5432/database_name

# Auth0
AUTH0_DOMAIN=dev-xxxxx.us.auth0.com
AUTH0_AUDIENCE=https://your-api.com

# AWS API externe
AWS_API_URL=https://aws-api.com/endpoint
AWS_API_TOKEN=TOKEN
```

2. Générez le client Prisma :

```bash
npx prisma generate
```

3. Appliquez les migrations :

```bash
npx prisma migrate dev --name init
```

4. Insérez des données par défaut :

```bash
npm run seed
```

---

## Commandes

| Commande                | Description                              |
|-------------------------|------------------------------------------|
| `npm run dev`           | Lance le serveur en mode développement   |
| `npm run build`         | Compile le projet TypeScript vers `dist/` |
| `npm start`             | Exécute la version compilée              |
| `npm run seed`          | Insère les catégories par défaut         |
| `npx prisma studio`     | Ouvre Prisma Studio (interface admin)    |
| `npx prisma migrate dev`| Applique les migrations                  |

---

## Structure du projet

```
server/
├── src/
│   ├── controllers/
│   ├── services/
│   ├── routers/
│   ├── middlewares/
│   ├── types/
│   ├── config/
│   └── index.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── .env
├── tsconfig.json
└── package.json
```

---

## Documentation de l’API

Une documentation Swagger est disponible à l'adresse :

```
http://localhost:3000/api-docs
```

Elle est générée automatiquement depuis les fichiers `*.router.ts`.

---

## Sécurité

- Authentification via Auth0 (JWT, RS256)
- Protection des routes avec `express-jwt`
- Clés secrètes stockées dans `.env`
- Rate Limiting via `express-rate-limit`
- Middleware CORS configuré

---

