# ─────────────────────────────────────────────
#  EECMI API — multi-stage Dockerfile
# ─────────────────────────────────────────────

# ── Base: shared node + package install ──────
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# ── Development: all deps + nodemon hot-reload
FROM base AS development
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npx", "nodemon", "server/server.js"]

# ── Production: prod deps only ───────────────
FROM base AS production
RUN npm install --omit=dev
COPY . .
EXPOSE 5000
CMD ["node", "server/server.js"]
