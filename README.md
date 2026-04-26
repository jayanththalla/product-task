# TaskFlow - Mini SaaS Task Management System

A production-ready task management application built with Node.js, Express, Sequelize (PostgreSQL), and React. This project was developed as part of a Full Stack Developer Intern screening test.

## Key Accomplishments & Requirements Check

### 1. Authentication System ✅
- **Signup / Login**: Fully functional auth flow with email and username.
- **Password Hashing**: Securely handled via `bcryptjs` in Sequelize hooks.
- **JWT Authentication**: Token-based sessions with 30-day expiration.
- **Protected Routes**: Backend middleware (`protect`) and Frontend `ProtectedRoute` wrapper.

### 2. Task Management (Multi-User) ✅
- **Multi-User Isolation**: Every task is strictly linked to a `userId`. Users can **only** fetch, update, or delete their own data.
- **CRUD Operations**: Complete Create, Read (Filter/Search), Update (Status), and Delete functionality.
- **Task Status**: Toggle between `Pending` and `Completed` with real-time UI updates.

### 3. Backend Requirements ✅
- **Stack**: Node.js + Express.
- **Architecture**: Clean folder structure:
  - `controllers/`: Business logic.
  - `routes/`: API endpoints.
  - `models/`: Database schemas.
  - `middleware/`: Auth protection and error handling.
- **Error Handling**: Global middleware to catch and format API errors.
- **Input Validation**: Robust validation using `express-validator` on all routes.

### 4. Frontend Requirements ✅
- **Stack**: React (Vite) + Tailwind CSS.
- **UI/UX**: Clean, modern interface with responsive layout, loading states, and toast-like error messages.
- **State Handling**: central state management using React Context API.
- **API Integration**: Axios-based communication with the backend.

### 5. Database ✅
- **ORM**: Sequelize with PostgreSQL.
- **Schema**: Proper relational design with UUIDs for primary keys to ensure security and scalability.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Lucide Icons, Axios, React Router.
- **Backend**: Node.js, Express, Sequelize, JSON Web Tokens (JWT), Bcryptjs, Express Validator.
- **Database**: PostgreSQL (SQLite supported for local development).

## Installation & Setup

### Prerequisites
- Node.js (v18+)
- PostgreSQL (or use the built-in SQLite fallback for quick testing)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file (see `.env.example` below):
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgresql://user:password@localhost:5432/task_management
   ```
4. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`
4. Open your browser at `http://localhost:5173`

## Features Implemented
- **Login/Signup** with robust password validation (Uppercase, Number, Special Char).
- **Task Dashboard** with real-time statistics (Total/Pending/Completed).
- **Search & Filter**: Find tasks by title or filter by status.
- **Task Actions**: Quick-toggle status directly from the list.
- **Responsive Layout**: Optimized for both desktop and mobile viewports.
