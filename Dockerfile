ARG image_name
ARG build_date
ARG git_branch
ARG git_commit_hash
ARG git_tag
ARG github_run_number
ARG version

FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000

# server.js is created by next build from the standalone output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]

LABEL \
  net.voluntree.build=$github_run_number \
  net.voluntree.created=$build_date \
  net.voluntree.gitbranch=$git_branch \
  net.voluntree.gittag=$git_tag \
  net.voluntree.gitcommit=$git_commit_hash \
  net.voluntree.name=$image_name \
  net.voluntree.version=$version