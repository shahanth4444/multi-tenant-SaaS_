# Backend Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY backend/package.json backend/package-lock.json* ./
RUN apk add --no-cache curl \
    && npm install --production

COPY backend/src ./src
COPY submission.json /app/submission.json

ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "src/server.js"]
