# Frequently Asked Questions (FAQ)

## General Questions

### Q: What is multi-tenancy?
**A:** Multi-tenancy is an architecture where a single instance of the software serves multiple customers (tenants). Each tenant's data is isolated and invisible to other tenants.

### Q: How is data isolation achieved?
**A:** Every database table (except super_admin users) has a `tenant_id` column. All queries automatically filter by the authenticated user's tenant_id, ensuring complete data isolation.

### Q: Can I use this for production?
**A:** Yes! This is a production-ready boilerplate with security best practices, Docker deployment, and comprehensive documentation.

## Authentication

### Q: How long do JWT tokens last?
**A:** JWT tokens expire after 24 hours. Users need to login again after expiration.

### Q: Can I change the token expiry time?
**A:** Yes, modify the `JWT_EXPIRES_IN` environment variable in `.env`.

### Q: What happens if I forget my password?
**A:** Password reset is not implemented in this version. Contact your tenant admin or super admin to reset your password.

## Subscription Plans

### Q: What are the differences between plans?
**A:**
- **Free**: 5 users, 3 projects
- **Pro**: 25 users, 15 projects  
- **Enterprise**: 100 users, 50 projects

### Q: Can I upgrade my plan?
**A:** Yes, super admins can update subscription plans via the API or database.

### Q: What happens when I reach my limit?
**A:** The API will return a 403 error preventing creation of new users/projects until you upgrade.

## Deployment

### Q: Do I need to deploy backend and frontend separately?
**A:** Yes, we recommend Render for backend (with PostgreSQL) and Vercel for frontend.

### Q: Can I use other hosting providers?
**A:** Yes! You can deploy to any platform that supports Node.js (backend) and static sites (frontend).

### Q: How do I update environment variables in production?
**A:** Update them in your hosting platform's dashboard (Render/Vercel environment variables section).

## Development

### Q: How do I add a new API endpoint?
**A:**
1. Create controller function in `backend/src/controllers/`
2. Add route in `backend/src/routes/`
3. Add authentication/authorization middleware if needed
4. Test the endpoint

### Q: How do I add a new page to the frontend?
**A:**
1. Create component in `frontend/src/pages/`
2. Add route in `frontend/src/App.jsx`
3. Add navigation link if needed

### Q: Can I use TypeScript instead of JavaScript?
**A:** Yes, you can migrate to TypeScript. Install type definitions and rename files to `.ts`/`.tsx`.

## Troubleshooting

### Q: Docker containers won't start
**A:** Run `docker-compose down -v` then `docker-compose up -d --build`. Check logs with `docker logs <container-name>`.

### Q: Database connection errors
**A:** Ensure `DB_HOST=database` (not localhost) in docker-compose environment variables.

### Q: Frontend can't connect to backend
**A:** Check CORS configuration in `backend/src/app.js` and verify `FRONTEND_URL` environment variable.

## Security

### Q: Is this secure for production?
**A:** Yes, it implements industry-standard security practices including password hashing, JWT authentication, SQL injection prevention, and CORS configuration.

### Q: Should I change the JWT secret?
**A:** Absolutely! Generate a strong random secret for production (minimum 32 characters).

### Q: How are passwords stored?
**A:** Passwords are hashed using bcrypt with 10 salt rounds. Plain text passwords are never stored.

## Customization

### Q: Can I add more user roles?
**A:** Yes, modify the role enum in database migrations and update authorization middleware.

### Q: Can I add custom fields to tenants/users?
**A:** Yes, create a new migration file to add columns to the respective tables.

### Q: Can I change the subscription limits?
**A:** Yes, update the limits in `backend/src/init.js` seed data or directly in the database.

## Support

### Q: Where can I get help?
**A:** 
- Check the documentation files (README.md, TROUBLESHOOTING.md, etc.)
- Open an issue on GitHub
- Contact the maintainer

### Q: Can I contribute to this project?
**A:** Yes! Please read CONTRIBUTING.md for guidelines.
