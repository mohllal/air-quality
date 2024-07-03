FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

ENV NODE_ENV production
USER node

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]