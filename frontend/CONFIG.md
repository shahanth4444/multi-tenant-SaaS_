# Frontend Configuration Guide

## Environment Variables

### Development
Create `.env.development`:
```
VITE_API_URL=http://localhost:5000/api
```

### Production
Create `.env.production`:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

## Build Commands

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable:
   - Name: `VITE_API_URL`
   - Value: Your production backend URL
4. Deploy

## API Configuration
The frontend uses Vite's environment variables. Access them in code:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```
