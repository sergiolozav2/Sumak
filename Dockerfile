    FROM node:20-alpine AS builder
    WORKDIR /app
    
    RUN corepack enable && corepack prepare pnpm@9.12.2 --activate
    
    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile
    
    COPY . .
    
    RUN rm -f pnpm-workspace.yaml

    # ARG DEPLOY_TARGET=ecs
    # ENV DEPLOY_TARGET=$DEPLOY_TARGET
    
    RUN pnpm run build
    
    FROM node:20-alpine
    WORKDIR /app
    
    RUN corepack enable && corepack prepare pnpm@9.12.2 --activate
    
    COPY --from=builder /app/.output /app/.output
    
    ENV NODE_ENV=production
    EXPOSE 3000
    CMD ["node", ".output/server/index.mjs"]