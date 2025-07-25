FROM node:18-alpine AS base

# ---------------- Build Stage ---------------- #
FROM base AS builder
WORKDIR /home/node/app

COPY package.json yarn.lock ./
COPY tsconfig.json ./
COPY payload.config.ts ./
COPY src ./src

ENV YARN_IGNORE_ENGINES=true

RUN yarn install --frozen-lockfile
RUN yarn build

# ---------------- Runtime Stage ---------------- #
FROM base AS runtime
WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js

EXPOSE 3000

CMD ["node", "./dist/server.js"]
