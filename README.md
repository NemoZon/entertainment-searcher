# PROJET ANNUEL

Auteurs : Gleb Bushukin, Typhaine Lefèvre, Angelo Samina, Karim Boussaid

## Exécuter le projet

Le projet peut être lancé à l'aide de Docker pour simplifier la configuration de l'environnement.

### Prérequis pour Docker

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Démarrer l'environnement Docker

1. Clonez le projet et accédez au répertoire:

```bash
git clone https://github.com/NemoZon/entertainment-searcher
```
2. Lancez les conteneurs Docker à partir de la racine:
```bash
docker-compose up -d
```
Cette commande va démarrer tous les services définis dans le docker-compose.yml:

Service client (React Native)
Service serveur (Express.js/Prisma)
Base de données PostgreSQL

3. Accédez à l'application:
```bash
Client: http://localhost:5173
```
```bash
API: http://localhost:3000
```
```bash
Documentation API: http://localhost:3000/api-docs
```

Pour arrêter l'envrionnement docker : 
```bash
docker-compose down
```
