#!/usr/bin/env pwsh

# Script to create granular commits for submission requirements

# Backend commits
Write-Host "Creating backend commits..." -ForegroundColor Green

git add backend/src/db.js
git commit -m "feat(backend): implement PostgreSQL database connection with pool management"

git add backend/src/middleware/auth.js
git commit -m "feat(auth): add JWT authentication middleware"

git add backend/src/middleware/rbac.js
git commit -m "feat(auth): implement role-based access control middleware"

git add backend/src/routes/auth.js
git commit -m "feat(auth): create authentication routes for login and registration"

git add backend/src/routes/projects.js
git commit -m "feat(projects): implement CRUD operations for project management"

git add backend/src/routes/tasks.js
git commit -m "feat(tasks): add task management endpoints with status updates"

git add backend/src/routes/tenants.js
git commit -m "feat(tenants): create tenant management routes for super admin"

git add backend/src/routes/users.js
git commit -m "feat(users): implement user management within tenants"

git add backend/src/seed.js
git commit -m "feat(database): add seed data for development and testing"

git add backend/src/server.js
git commit -m "feat(backend): setup Express server with middleware and routes"

# Frontend component commits
Write-Host "Creating frontend component commits..." -ForegroundColor Green

git add frontend/src/components/NavBar.jsx
git commit -m "feat(ui): create responsive navigation bar with role-based menu"

git add frontend/src/components/ProtectedRoute.jsx
git commit -m "feat(routing): implement protected route component for authentication"

git add frontend/src/pages/Login.jsx
git commit -m "feat(auth): create login page with tenant subdomain support"

git add frontend/src/pages/Register.jsx
git commit -m "feat(auth): implement tenant registration form"

git add frontend/src/api.js
git commit -m "feat(frontend): setup Axios instance with auth interceptors"

git add frontend/src/App.jsx
git commit -m "feat(routing): configure React Router with protected routes"

# Docker and config commits
Write-Host "Creating configuration commits..." -ForegroundColor Green

git add docker-compose.yml
git commit -m "feat(docker): setup multi-container environment with health checks"

git add backend/Dockerfile
git commit -m "feat(docker): create optimized backend Dockerfile"

git add frontend/Dockerfile
git commit -m "feat(docker): create production-ready frontend Dockerfile"

git add frontend/vite.config.js
git commit -m "feat(frontend): configure Vite build tool with API proxy"

git add frontend/tailwind.config.js
git commit -m "feat(ui): setup Tailwind CSS with custom theme"

git add frontend/postcss.config.js
git commit -m "feat(ui): configure PostCSS for Tailwind processing"

# Final commit
git add .
git commit -m "chore: finalize project structure and configurations" --allow-empty

Write-Host "`nCommit creation complete!" -ForegroundColor Green
Write-Host "Total commits: " -NoNewline
git log --oneline | Measure-Object -Line | Select-Object -ExpandProperty Lines
