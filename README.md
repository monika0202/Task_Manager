# Task Manager

A full-stack task management application built with React, Vite, Express, MongoDB, and JWT authentication.

## Project Overview

This project includes:
- **Backend**: Node.js + Express API with user authentication, task CRUD operations, and MongoDB integration.
- **Frontend**: React + Vite SPA with login/signup, protected dashboard, dark mode, task filters, and task management UI.

## Features

- User signup and login
- JWT-based protected API routes
- Create, read, update, and delete tasks
- Task status toggle between `Pending` and `Completed`
- Tag selection for tasks
- Client-side filtering for task status
- Dark mode toggle

## Repository Structure

- `backend/` - Express API and MongoDB models
  - `server.js` - app entry point
  - `config/db.js` - database connection
  - `controllers/` - authentication and task logic
  - `middleware/` - JWT auth middleware
  - `models/` - Mongoose schemas for `User` and `Task`
  - `routes/` - auth and task routes
- `frontend/` - React application powered by Vite
  - `src/` - React components, pages, routing, and API client
  - `public/` - static assets

## Prerequisites

- Node.js 18+ (or compatible)
- npm
- MongoDB instance or MongoDB Atlas cluster

## Environment Setup

### Backend

Create a `.env` file inside `backend/` with the following values:

```env
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
```

### Frontend

No environment variables are required for the frontend in this setup. The frontend is configured to use the backend API at `http://localhost:5000/api`.

## Install Dependencies

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Run the Application

### Start Backend

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000` by default.

### Start Frontend

```bash
cd frontend
npm run dev
```

The frontend Vite app typically runs on `http://localhost:5173`.

## Available Scripts

### Backend
- `npm start` - Run the backend server with Node
- `npm run dev` - Run the backend with Nodemon for development

### Frontend
- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production frontend bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint on frontend source files

## API Endpoints

### Auth
- `POST /api/auth/signup` - Create a new user
- `POST /api/auth/login` - Authenticate user and receive JWT token

### Tasks (protected)
- `GET /api/tasks` - Get all tasks for logged-in user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Notes

- The frontend stores the JWT token in `localStorage` and attaches it to requests automatically.
- Protected routes require a valid `Authorization: Bearer <token>` header.
- Tasks are stored with a `userId` reference and only fetched for the authenticated user.

## License

This project is currently unlicensed.
