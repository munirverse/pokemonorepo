<p align="center">
    <img src="https://raw.githubusercontent.com/munirverse/pokemonorepo/refs/heads/main/apps/pokemon-fe/public/logo.png" width="300">
</p>
A full-stack pokédex project using Nx, NestJS, and Next.js

## Table of Contents
* [Background Stories](#background-stories)
* [Installation](#installation)

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
clone the pokemonorepo's repository
```bash
git clone https://github.com/munirverse/pokemonorepo.git && cd pokemonorepo
```
install npm dependencies
```bash
npm install
```
copy and distribute env file configuration
```bash
cp .env.example .env
cp .env.example ./apps/pokemon-fe/.env
cp .env.example ./apps/pokemon-be/.env
```
adjust the env files to match with your local environment (especially the db connections). Run this command below to start both frontend and backend service pararelly (Notes: frontend instance need to take several times to up because build process)
```bash
npx nx run-many -t start
```
or run each instance separately in dev mode
```bash
# backend
npx nx run pokemon-be:serve
# frontend
npx nx run pokemon-fe:dev 
```
### With Docker 
clone the pokemonorepo's repository
```bash
git clone https://github.com/munirverse/pokemonorepo.git && cd pokemonorepo
```
copy env file
```bash
cp .env.example .env
```
run docker-compose command
```bash
docker-compose build && docker-compose up -d
```
