# Expense Tracker

A full-stack expense tracker built with the MERN stack
(MongoDB, Express, React, Node).

## Features
- Register / login with JWT authentication
- Add, edit, delete expenses (title, amount, category, date, note)
- Filter expenses by category
- Dashboard with total spent, this month, count and top category
- Light / dark theme

## API

| Method | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Create account | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Current user | Yes |
| GET | `/api/expenses` | List expenses (`?category=food`) | Yes |
| GET | `/api/expenses/summary` | Total, this month, by category | Yes |
| GET | `/api/expenses/:id` | One expense | Yes |
| POST | `/api/expenses` | Add expense | Yes |
| PUT | `/api/expenses/:id` | Update expense | Yes |
| DELETE | `/api/expenses/:id` | Delete expense | Yes |
| GET | `/api/health` | Health check | No |

Send the token as `Authorization: Bearer <token>`.

## Run locally

Backend:

```bash
cd Backend
cp .env.example .env     # then fill in MONGO_URI and JWT_SECRET
npm install
npm run dev
```

Frontend (new terminal):

```bash
cd Frontend
npm install
npm run dev
```

Open http://localhost:5173 (the frontend proxies `/api` to port 3000).

## Folder structure

```
Backend/   controllers, models, routes, middleware, config, server.js
Frontend/  src/pages, src/components, src/services, src/context
```
