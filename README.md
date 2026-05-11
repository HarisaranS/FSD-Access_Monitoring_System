# Adaptive Zero Trust Commerce

Full stack demo with a futuristic UI, adaptive zero trust logging, and audit trails.

## Structure

- `frontend/` Vite + React app (deploy on Vercel)
- `backend/` Express + MongoDB Atlas API (deploy on Render)

## Local setup

### Backend

1. Copy `backend/.env.example` to `backend/.env` and fill values.
2. `cd backend && npm install`
3. `npm run dev`

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL`.
2. `cd frontend && npm install`
3. `npm run dev`

## Deploy

### Vercel (frontend)

- Import the repo in Vercel.
- Set root directory to `frontend`.
- Build command: `npm run build`
- Output: `dist`
- Env: `VITE_API_URL` to your Render backend URL

### Render (backend)

- Create a new Web Service from `backend` folder.
- Build command: `npm install`
- Start command: `npm start`
- Env vars: `MONGO_URI`, `JWT_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
