# API Endpoints Quick Reference

## Authentication APIs

### Register Tenant
`POST /api/auth/register-tenant`
- Create new tenant and admin user
- Public endpoint

### Login
`POST /api/auth/login`
- Authenticate user and get JWT token
- Public endpoint

### Get Current User
`GET /api/auth/me`
- Get authenticated user details
- Requires authentication

### Logout
`POST /api/auth/logout`
- Logout current user
- Requires authentication

## Tenant Management APIs

### Get Tenant Details
`GET /api/tenants/:tenantId`
- Get specific tenant information
- Requires authentication

### Update Tenant
`PUT /api/tenants/:tenantId`
- Update tenant information
- Requires tenant_admin or super_admin

### List All Tenants
`GET /api/tenants`
- List all tenants (super_admin only)
- Requires super_admin role

## User Management APIs

### Add User to Tenant
`POST /api/tenants/:tenantId/users`
- Create new user in tenant
- Requires tenant_admin

### List Tenant Users
`GET /api/tenants/:tenantId/users`
- Get all users in tenant
- Requires authentication

### Update User
`PUT /api/users/:userId`
- Update user information
- Requires tenant_admin or self

### Delete User
`DELETE /api/users/:userId`
- Remove user from tenant
- Requires tenant_admin

## Project Management APIs

### Create Project
`POST /api/projects`
- Create new project
- Requires authentication

### List Projects
`GET /api/projects`
- Get all projects for tenant
- Requires authentication

### Update Project
`PUT /api/projects/:projectId`
- Update project details
- Requires tenant_admin or creator

### Delete Project
`DELETE /api/projects/:projectId`
- Remove project
- Requires tenant_admin or creator

## Task Management APIs

### Create Task
`POST /api/projects/:projectId/tasks`
- Add task to project
- Requires authentication

### List Project Tasks
`GET /api/projects/:projectId/tasks`
- Get all tasks in project
- Requires authentication

### Update Task Status
`PATCH /api/tasks/:taskId/status`
- Change task status
- Requires authentication

### Update Task
`PUT /api/tasks/:taskId`
- Update task details
- Requires authentication

---

For detailed API documentation with request/response examples, see `docs/API.md`
