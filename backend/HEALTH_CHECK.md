# Health Check Endpoint Documentation

## Endpoint
`GET /api/health`

## Description
Returns the health status of the backend API and database connection.

## Authentication
None required (public endpoint)

## Response

### Success (200 OK)
```json
{
  "status": "ok",
  "database": "connected"
}
```

### Error (500 Internal Server Error)
```json
{
  "status": "error",
  "database": "disconnected"
}
```

## Usage
```bash
curl https://your-backend-url.com/api/health
```

## Monitoring
This endpoint can be used for:
- Uptime monitoring
- Load balancer health checks
- Deployment verification
- CI/CD pipeline validation
