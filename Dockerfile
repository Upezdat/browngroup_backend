# Base image
FROM node:18.8-alpine AS base

# Builder image
FROM base AS builder
WORKDIR /app

# Copy only necessary files for installing dependencies and building
COPY package*.json yarn.lock tsconfig.json payload.config.ts ./
COPY src ./src

# Install all dependencies and build
RUN yarn install
RUN yarn build

# Runtime image
FROM base AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

# Copy only what's needed for production
COPY package*.json yarn.lock ./
RUN yarn install --production

# Copy build output from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/build ./build

EXPOSE 3000

# Start server
CMD ["node", "dist/server.js"]
