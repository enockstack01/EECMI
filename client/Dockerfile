# ─────────────────────────────────────────────
#  EECMI Client — multi-stage Dockerfile
# ─────────────────────────────────────────────

# ── Development: CRA dev server with hot-reload
FROM node:20-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true
CMD ["npm", "start"]

# ── Build stage: compile static assets ────────
FROM node:20-alpine AS build
WORKDIR /app
ARG REACT_APP_CLERK_PUBLISHABLE_KEY
ENV REACT_APP_CLERK_PUBLISHABLE_KEY=$REACT_APP_CLERK_PUBLISHABLE_KEY
COPY package*.json ./
RUN npm ci --omit=optional
COPY . .
RUN npm run build

# ── Production: nginx serves the built assets ─
FROM nginx:1.27-alpine AS production
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
