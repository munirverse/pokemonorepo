<p align="center">
    <img src="https://raw.githubusercontent.com/munirverse/pokemonorepo/refs/heads/main/apps/pokemon-fe/public/logo.png" width="300">
</p>
<p align="center">
    <img src="https://github.com/munirverse/pokemonorepo/blob/main/assets/pokemonorepo-screenshoot.gif?raw=true" width="500">
</p>
A full-stack pokédex project using Nx, NestJS, and Next.js

- Web Demo: [https://pokemonorepo.munirverse.com](https://pokemonorepo.munirverse.com)
- Storybook: [https://pokemonorepo.munirverse.com/docs/storybook](https://pokemonorepo.munirverse.com/docs/storybook)
- API Specs: [https://pokemonorepo.munirverse.com/docs/api-specs](https://pokemonorepo.munirverse.com/docs/api-specs)

## Table of Contents
- [Background Stories](#background-stories)
- [Installation](#installation)
  - [Manual Installation](#manual-installation)
  - [With Docker](#with-docker)
  - [Running Tests](#running-tests)
- [Technology Highlights](#technology-highlights)
  - [Techstack](#techstack)
  - [Backend](#backend)
  - [Frontend](#frontend)
  - [DevOps](#devops)
  - [Others](#others)
  - [Features](#features)
- [License](#license)

## Background Stories
**Pokemonorepo** is created as a mini portfolio project as well as a learning medium for myself and others who are starting to learn about full-stack web development.

### Why a mini portfolio project? 
Because through this project, I can showcase a miniature representation of my technical skills in tackling full-stack web development challenges with source code that I write and organize openly. This is something I cannot fully demonstrate through the projects at my previous companies. 

### Why a learning medium? 
Because with open source code, anyone can analyze how my code works and provide corrections if there are areas that can still be improved, offering valuable insights for everyone.

### Why choose a Pokédex?
A project theme like Pokédex offers a more enjoyable experience while providing space for exploration with various technical features, such as search functionality, data filtering, pagination, and other features that challenge me to be creative.

## Installation
### Manual Installation
Clone the pokemonorepo's repository
```bash
git clone https://github.com/munirverse/pokemonorepo.git && cd pokemonorepo
```
Install npm dependencies
```bash
npm install
```
Copy and distribute env file configuration
```bash
cp .env.example .env
cp .env.example ./apps/pokemon-fe/.env
cp .env.example ./apps/pokemon-be/.env
```
Adjust the env files to match with your local environment (especially the db connections). Afterward, run this command to migrate tables and seeds the requirement data
```bash
npx nx run pokemon-be:migrate
npx nx run pokemon-be:pokemons && npx nx run pokemon-be:details && npx nx run pokemon-be:shapes
```
Run this command below to start both frontend and backend service pararelly (Notes: frontend instance need to take several times to up because build process)
```bash
npx nx run-many -t start
```
Or run each instance separately in dev mode
```bash
# backend
npx nx run pokemon-be:serve
# frontend
npx nx run pokemon-fe:dev 
```
### With Docker 
Clone the pokemonorepo's repository
```bash
git clone https://github.com/munirverse/pokemonorepo.git && cd pokemonorepo
```
Copy env file
```bash
cp .env.example .env
```
Run this command to migrate tables and seeds the requirement data
```bash
npx nx run pokemon-be:migrate
npx nx run pokemon-be:pokemons && npx nx run pokemon-be:details && npx nx run pokemon-be:shapes
```
Run docker-compose command
```bash
docker-compose build && docker-compose up -d
```
### Running Tests
running backend unit test 
```bash
npx nx run pokemon-be:test
```
running sharing package unit test
```bash
npx nx run shared:test
```
running e2e test 
```bash
npx nx run pokemon-be-e2e:e2e # backend e2e test
npx nx run pokemon-fe-e2e:e2e # frontend e2e test 
```


## Technology Highlights
### Techstack
- Nest.js
- Next.js
- Nx
- Docker
- PostgreSQL
- Prisma
- Jest
- Playwright
- Storybook
### Backend 
- Nest.js Best practices
- Prisma Integration with Migration and Seeder
- Nest.js Validation with Class transformer
- Nest.js Swagger API Documentation
- Unit testing with Jest
- Backend End to End (e2e) Testing Integration
### Frontend
- Next.js Best practices
- Web components with Mantine
- Redux design patterns
- Storybook Documentations
- Frontend End to End (e2e) Testing with Playwright
### DevOps
- Containerization with Docker
- Github Actions CI/CD 
### Others
- Manage monorepo project with Nx
- Precommit management with Husky
### Features
- Filtering & pagination
- Search 
- Infinite scroll
## License
This project is licensed under the MIT License. See the [LICENSE](./license) file for more details.
