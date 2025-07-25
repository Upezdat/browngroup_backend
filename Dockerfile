# Step 1: Build Stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock tsconfig.json ./
COPY src ./src
COPY src/payload.config.ts ./src/

RUN yarn install --frozen-lockfile
RUN yarn build

# Step 2: Runtime Stage
FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

EXPOSE 3000

CMD ["node", "./dist/server.js"]
