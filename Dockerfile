# base stage
FROM node:18.8-alpine as base

# build stage
FROM base as builder
WORKDIR /home/node/app

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig.json ./
COPY src ./src
COPY payload.config.ts ./

ENV YARN_IGNORE_ENGINES=true
RUN yarn install
RUN yarn build

# runtime stage
FROM base as runtime
WORKDIR /home/node/app

ENV NODE_ENV=production
ENV PAYLOAD_CONFIG_PATH=dist/payload.config.js
ENV YARN_IGNORE_ENGINES=true

COPY package*.json ./
COPY yarn.lock ./
RUN yarn install --production

COPY --from=builder /home/node/app/dist ./dist
COPY --from=builder /home/node/app/build ./build

EXPOSE 3000
CMD ["node", "./dist/server.js"]
