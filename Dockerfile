# Builder stage
FROM node:20 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

# Production stage
# FROM node:20 AS production
FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

RUN npm prune --omit=dev

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
