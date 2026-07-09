# FileGrid

This repo has a split frontend/backend structure for deployment.

## Frontend
- `frontend/`
- `frontend/package.json`
- `frontend/vite.config.ts`
- `frontend/src/App.tsx`

## Backend
- `backend/`
- `backend/package.json`
- `backend/server.js`

## Deploy to Render
### Frontend
1. Create a new Web Service in Render.
2. Connect the repo and choose `frontend` as the root directory.
3. Set build command: `npm install && npm run build`
4. Set publish directory: `frontend/dist`

### Backend
1. Create a new Web Service in Render.
2. Connect the repo and choose `backend` as the root directory.
3. Set build command: `npm install`
4. Set start command: `node server.js`

### Notes
- If you want both on a single Render service, use a custom Express server to serve `/frontend/dist` and run from the repo root.
- This layout keeps frontend and backend separate for easier local development and Render deployment.
