# Pour analytics : 
    -   App.tsx : ajout de posthog dans l'application
    -   Home.tsx : Ajoute capture view pour voir l'activité sur la page    
        Activité sur le bouton modifier event
    -   SignIn.tsx : Voir les connexions
    - Welcom : bouton combien de personne valider les mention légales

Pour les test unitaires voir autre git -> FYD (fichier testunitaires)
Pour Sentry voir également sur autre git -> FYD 

Au besoin pour PostHog on à encore un autre site si trop peu d'informations



# PROJET ANNUEL

Auteurs : Gleb Bushukin, Typhaine Lefèvre, Angelo Samina, Karim Boussaid

## Exécuter le projet

Le projet peut être lancé à l'aide de Docker pour simplifier la configuration de l'environnement.

### Prérequis pour Docker

- [Docker desktop](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Démarrer l'environnement Docker

1. Clonez le projet et accédez au répertoire:

```bash
git clone https://github.com/NemoZon/entertainment-searcher
```
2. Lancez les conteneurs Docker à partir de la racine:
```bash
cd /server
```
```bash
npm install
```
```bash
docker-compose up --build
```
Cette commande va démarrer tous les services définis dans le docker-compose.yml:

Service serveur (Express.js/Prisma)
Base de données PostgreSQL

3. Accédez à l'application:

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
