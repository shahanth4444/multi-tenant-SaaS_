# Render.com Deployment Configuration

## Service Type
Web Service

## Build Command
```bash
npm install
```

## Start Command
```bash
node src/server.js
```

## Environment Variables
```
DB_HOST=<your-render-postgres-host>
DB_PORT=5432
DB_NAME=<your-database-name>
DB_USER=<your-database-user>
DB_PASSWORD=<your-database-password>
JWT_SECRET=supersecret_jwt_key_that_is_at_least_32_chars!
JWT_EXPIRES_IN=24h
PORT=5000
NODE_ENV=production
FRONTEND_URL=<your-vercel-frontend-url>
SEED_ON_START=true
```

## Health Check Path
`/api/health`

## Auto-Deploy
Enable auto-deploy from `main` branch
