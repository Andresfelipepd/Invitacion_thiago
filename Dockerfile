# syntax=docker/dockerfile:1.7
ARG NODE_VERSION=22.20.0
ARG PNPM_VERSION=10.17.1

# --- 1) deps ---
FROM node:${NODE_VERSION}-alpine AS deps
ARG PNPM_VERSION
WORKDIR /app
RUN apk add --no-cache libc6-compat \
 && corepack enable \
 && corepack prepare "pnpm@${PNPM_VERSION}" --activate    # <-- pinneamos pnpm
# copia manifiestos
COPY package.json pnpm-lock.yaml ./
# cache del store de pnpm
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# --- 2) builder ---
FROM node:${NODE_VERSION}-alpine AS builder
ARG PNPM_VERSION
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN corepack enable && corepack prepare "pnpm@${PNPM_VERSION}" --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# --- 3) runner ---
FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
USER node
COPY --chown=node:node --from=builder /app/public ./public
COPY --chown=node:node --from=builder /app/.next/standalone ./
COPY --chown=node:node --from=builder /app/.next/static ./.next/static
COPY --chown=node:node --from=builder /app/next.config.mjs ./next.config.mjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
