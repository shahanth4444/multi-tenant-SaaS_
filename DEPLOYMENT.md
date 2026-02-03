# Deployment Scripts

## Deploy to Render

### Prerequisites
1. Create account at https://render.com
2. Create PostgreSQL database
3. Note down database connection details

### Steps
1. Push code to GitHub
2. Go to Render Dashboard
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - Name: multi-tenant-saas-backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
   - Root Directory: `backend`
6. Add environment variables from `.env.production`
7. Deploy!

## Deploy Frontend to Vercel

### Prerequisites
1. Create account at https://vercel.com
2. Install Vercel CLI: `npm i -g vercel`

### Steps
1. Push code to GitHub
2. Go to Vercel Dashboard
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
7. Deploy!

## Verify Deployment
- Backend health: `https://your-backend.onrender.com/api/health`
- Frontend: `https://your-app.vercel.app`
- Test login with seed credentials
