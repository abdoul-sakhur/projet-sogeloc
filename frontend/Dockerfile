# syntax=docker/dockerfile:1

FROM node:20-bookworm-slim AS base
WORKDIR /app
COPY package.json package-lock.json ./

# -----------------------------------------------------------------------
# dev — hot reload via `next dev --turbopack`; source is bind-mounted by
# compose, node_modules stays inside the image (see docker-compose.dev.yml).
# -----------------------------------------------------------------------
FROM base AS dev
ENV NODE_ENV=development
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# -----------------------------------------------------------------------
# build — NEXT_PUBLIC_* vars are inlined into the client bundle at build
# time, so they must be passed as build args (docker-compose.yml does this).
# -----------------------------------------------------------------------
FROM base AS build
ENV NODE_ENV=production
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_STRAPI_API_URL
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_STRAPI_API_URL=$NEXT_PUBLIC_STRAPI_API_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# -----------------------------------------------------------------------
# production — Next.js standalone output: a self-contained server.js plus
# only the node_modules it actually needs, so the runtime image stays small.
# -----------------------------------------------------------------------
FROM node:20-bookworm-slim AS production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
ENV PORT=3000 HOSTNAME=0.0.0.0
CMD ["node", "server.js"]
