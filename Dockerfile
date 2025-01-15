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

# Define build-time arguments
ARG BE_LOCAL_URL

# Pass the build args as environment variables
ENV BE_LOCAL_URL=$BE_LOCAL_URL

# Build frontend
RUN npx nx run pokemon-fe:build:production --verbose


