# QuickCheck Doctor App

A professional full-stack healthcare doctor portal.

## Project Structure

```
QuickCheck-Doctor-App/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
└── backend/           # Express + MongoDB backend (scaffolded)
    ├── src/
    │   ├── controllers/
    │   ├── middleware/
    │   ├── models/
    │   ├── routes/
    │   ├── config/
    │   ├── services/
    │   ├── utils/
    │   ├── app.js
    │   └── server.js
    ├── .env
    ├── nodemon.json
    └── package.json
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at: http://localhost:5173

### Backend (when ready)

```bash
cd backend
npm install
npm run dev
```

Runs at: http://localhost:5000

## Tech Stack

**Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Lucide React

**Backend (scaffolded):** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
