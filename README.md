# TaskFlow - Mini SaaS Task Management System

A production-ready task management application built with Node.js, Express, Sequelize (PostgreSQL), and React. This project was developed as part of a Full Stack Developer Intern screening test.

---

## 🚀 Live Demo & Repository
- **GitHub Repository**: (Insert your repo link here)
- **Live Deployment**: (Insert your Vercel/Render link here)

---

## ✨ Features Implemented

### 🔐 Authentication System
- **Secure Signup & Login**: Full auth lifecycle with proper error feedback.
- **Dynamic Password Validation**: Real-time checklist for password complexity (uppercase, lowercase, numbers, and special characters).
- **Match Verification**: Instant "Confirm Password" validation.
- **Security**: 
  - Password hashing using **Bcryptjs**.
  - Token-based sessions with **JWT**.
  - Protected routes on both Frontend (React Router) and Backend (Express Middleware).

### 📋 Task Management (Multi-User)
- **Private Dashboards**: Every user has their own private space. Multi-user isolation ensures users only interact with their own tasks.
- **Full CRUD**: Create, View, Update status, and Delete tasks.
- **Smart Filters**: Filter by `All`, `Pending`, or `Completed` status.
- **Instant Search**: Real-time title/description searching.
- **Productivity Stats**: Visual counters for Total, Done, and Pending tasks.
- **Modern UX**: Custom inline delete confirmations (replacing ugly native popups) and loading spinners.

---

## 🛠 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide Icons, Axios, React Context API.
- **Backend**: Node.js, Express, Sequelize ORM, JSON Web Tokens (JWT), Bcryptjs, Express Validator.
- **Database**: PostgreSQL (Primary) / SQLite (Fallback for testing).
- **Deployment**: Vercel (Unified Monorepo Architecture).

---

## 🏗 Backend Architecture
The project follows a standard MVC-inspired architecture for high maintainability:
- `controllers/`: Request handling and business logic.
- `models/`: Database schema definitions and Sequelize hooks.
- `routes/`: Express endpoint definitions with validation.
- `middleware/`: Auth protection and global error handling.

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (Local or Managed)

### 2. Backend Setup
1. Open the `/backend` folder.
2. Run `npm install`.
3. Create a `.env` file with the following variables:
   ```env
   PORT=5000
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=postgresql://user:password@localhost:5432/task_management
   ```
4. Run `npm run dev`.

### 3. Frontend Setup
1. Open the `/frontend` folder.
2. Run `npm install`.
3. Create a `.env` file with:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run `npm run dev` and visit `http://localhost:5173`.

---

## ☁️ Deployment (Vercel)
This project is pre-configured for **Vercel Experimental Services**, allowing the frontend and backend to be deployed as a single unified project.
- **Config**: See `vercel.json` in the root directory.
- **Routing**: The backend is automatically served under the `/_/backend` prefix to eliminate CORS issues.
