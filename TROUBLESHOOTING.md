# Troubleshooting Guide

## Common Issues and Solutions

### Docker Issues

#### Issue: Containers won't start
**Solution:**
```bash
# Stop all containers
docker-compose down -v

# Rebuild and start
docker-compose up -d --build
```

#### Issue: Database connection refused
**Symptoms:** Backend logs show "ECONNREFUSED"
**Solution:**
- Wait for database to be healthy (check `docker-compose ps`)
- Verify DB_HOST=database (not localhost)
- Check database logs: `docker logs database`

#### Issue: Port already in use
**Symptoms:** "port is already allocated"
**Solution:**
```bash
# Find process using port
netstat -ano | findstr :5000

# Kill the process or change port in docker-compose.yml
```

### Backend Issues

#### Issue: Migrations not running
**Solution:**
```bash
# Check backend logs
docker logs backend

# Manually run migrations
docker exec -it backend node src/init.js
```

#### Issue: Seed data not loading
**Solution:**
- Check if super admin already exists
- Delete database volume and restart:
```bash
docker-compose down -v
docker-compose up -d
```

#### Issue: JWT token invalid
**Symptoms:** 401 Unauthorized errors
**Solution:**
- Check JWT_SECRET is set correctly
- Verify token hasn't expired (24h)
- Clear browser localStorage and login again

### Frontend Issues

#### Issue: API calls failing with CORS error
**Solution:**
- Verify FRONTEND_URL in backend .env
- Check CORS configuration in backend/src/app.js
- Ensure backend is running

#### Issue: Build fails
**Solution:**
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Issue: Environment variables not working
**Solution:**
- Vite requires `VITE_` prefix
- Restart dev server after changing .env
- Check import.meta.env.VITE_API_URL

### Database Issues

#### Issue: Cannot connect to PostgreSQL
**Solution:**
```bash
# Check if database container is running
docker-compose ps

# Check database logs
docker logs database

# Verify credentials in .env match docker-compose.yml
```

#### Issue: Table doesn't exist
**Solution:**
- Migrations didn't run
- Check backend logs for migration errors
- Manually run: `docker exec -it backend node src/init.js`

### Production Issues

#### Issue: Render deployment fails
**Solution:**
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure start command is correct: `node src/server.js`

#### Issue: Vercel build fails
**Solution:**
- Check build logs in Vercel dashboard
- Verify build command: `npm run build`
- Ensure VITE_API_URL is set in environment variables

#### Issue: Database connection timeout in production
**Solution:**
- Check if database allows external connections
- Verify DB_HOST, DB_PORT are correct
- Check firewall rules
- Ensure database is in same region (for better latency)

## Getting Help

1. Check logs first: `docker logs <container-name>`
2. Search existing issues on GitHub
3. Create new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Relevant logs

## Debug Mode

Enable debug logging:
```bash
# Backend
NODE_ENV=development npm run dev

# Check detailed logs
docker logs backend --follow
```
