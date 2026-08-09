# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /opt/app
# python3/make/g++/libvips-dev: needed to install sharp (image processing,
# used by Strapi's upload provider) when no prebuilt binary matches the
# platform. Debian/glibc avoids the native-module pitfalls Alpine/musl can hit.
RUN apt-get update && apt-get install -y --no-install-recommends \
      python3 make g++ libvips-dev \
    && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./

# -----------------------------------------------------------------------
# dev — hot reload via `strapi develop`; source is bind-mounted by compose,
# node_modules stays inside the image (see docker-compose.dev.yml).
# -----------------------------------------------------------------------
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 1337
CMD ["npm", "run", "develop"]

# -----------------------------------------------------------------------
# build — install prod deps and compile the admin panel + server code.
# -----------------------------------------------------------------------
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
RUN npm run build
# devDependencies (typescript, @types/*...) were needed to build but not to
# run — prune them so they don't bloat the production image below.
RUN npm prune --omit=dev

# -----------------------------------------------------------------------
# production — slim runtime image, no compiler toolchain.
# -----------------------------------------------------------------------
FROM node:20-bookworm-slim AS production
WORKDIR /opt/app
RUN apt-get update && apt-get install -y --no-install-recommends libvips42 \
    && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
COPY --from=build --chown=node:node /opt/app ./
USER node
EXPOSE 1337
CMD ["npm", "run", "start"]
