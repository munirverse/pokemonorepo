FROM node:22.13.0-alpine3.21

# Install openssl for prisma
RUN apk update && apk add --no-cache openssl

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files to the container (relative paths should be adjusted)
COPY . .

# Install to trigger bun lockfile
RUN npm install --legacy-peer-deeps

# Reset nx cache
RUN npx nx reset 

# Generate prisma schema
RUN npx prisma generate --schema apps/pokemon-be/prisma/schema.prisma

# Build frontend
RUN npx nx run pokemon-fe:build:production --verbose


