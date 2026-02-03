# Testing Guide

## Local Testing with Docker

### Start All Services
```bash
docker-compose up -d
```

### Check Service Health
```bash
# Backend health
curl http://localhost:5000/api/health

# Check all containers
docker-compose ps
```

### View Logs
```bash
# Backend logs
docker logs backend --tail 50

# Frontend logs
docker logs frontend --tail 50

# Database logs
docker logs database --tail 50
```

## API Testing

### Test Super Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "superadmin@system.com",
    "password": "Admin@123",
    "tenantSubdomain": "system"
  }'
```

### Test Tenant Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@demo.com",
    "password": "Demo@123",
    "tenantSubdomain": "demo"
  }'
```

### Test Regular User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user1@demo.com",
    "password": "User@123",
    "tenantSubdomain": "demo"
  }'
```

## Frontend Testing

1. Open browser to `http://localhost:3000`
2. Test registration page
3. Test login with seed credentials
4. Verify dashboard loads
5. Test project creation
6. Test task management

## Production Testing

### Backend Health Check
```bash
curl https://your-backend.onrender.com/api/health
```

### Frontend Access
Open `https://your-app.vercel.app` in browser

## Troubleshooting

### Database Connection Issues
- Check `DB_HOST`, `DB_PORT`, `DB_NAME` environment variables
- Verify database is running: `docker-compose ps`
- Check database logs: `docker logs database`

### Backend Not Starting
- Check backend logs: `docker logs backend`
- Verify migrations ran successfully
- Check environment variables

### Frontend Not Loading
- Check frontend logs: `docker logs frontend`
- Verify API URL is correct
- Check browser console for errors
