# 🚀 Smart Project Management Portal

A modern, production-style task management dashboard — built to look and feel like a real internal tool at a startup, not a tutorial CRUD app.

**Stack:** React (Vite) · Tailwind CSS · Framer Motion · Node.js · Express · MySQL · Sequelize · Axios

---

## ✨ Highlights

- **Dashboard analytics** — live Total / Completed / Pending / Progress % stat cards
- **Glassmorphism UI** — frosted cards, soft gradients, ambient animated background blobs
- **Smart filtering** — status tabs (All / Pending / In Progress / Completed) + debounced live search
- **Polished interaction states** — skeleton loaders, empty-state illustration, toast notifications, per-row "busy" states, delete confirmation
- **Dark mode** — persisted via `localStorage`, respects OS preference on first visit
- **Clean architecture** — MVC backend, service-layer frontend, reusable UI primitives, custom hooks
- **Accessible & responsive** — keyboard-dismissible modals, focus states, mobile-first layout, respects `prefers-reduced-motion`

---

## 📁 Folder Structure

```
project-root/
├── backend/
│   ├── config/          # Sequelize/MySQL connection (db.js)
│   ├── controllers/     # Business logic (taskController.js)
│   ├── models/          # Sequelize model (Task.js)
│   ├── routes/          # Express routers
│   ├── middleware/      # Validation + centralized error handling
│   ├── utils/           # ApiError, asyncHandler
│   ├── app.js           # Express app config
│   └── server.js        # Entry point
│
└── frontend/
    └── src/
        ├── components/
        │   ├── ui/        # Button, Modal, Badge, Skeleton, EmptyState, ConfirmDialog
        │   ├── layout/    # Navbar
        │   └── tasks/     # StatsCards, TaskCard, TaskList, TaskForm, TaskFilters, SearchBar
        ├── pages/         # Dashboard.jsx
        ├── services/      # api.js (axios instance), taskService.js
        ├── hooks/         # useTasks.js, useDebounce.js
        ├── context/       # ThemeContext.jsx (dark mode)
        └── utils/         # constants.js, validators.js
```

---

## 🛠️ Installation

### Prerequisites
- Node.js ≥ 18
- A running MySQL server (local install, or MySQL via Docker/XAMPP/WAMP)

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env     # then fill in your DB_NAME, DB_USER, DB_PASSWORD
# Make sure the database in DB_NAME exists, e.g.:
#   mysql -u root -p -e "CREATE DATABASE smart_task_portal;"
npm run dev               # starts on http://localhost:5000
# Sequelize automatically creates the `tasks` table on first run.
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env      # defaults already point to localhost:5000
npm run dev                # starts on http://localhost:5173
```

Open **http://localhost:5173** — the app talks to the API automatically.

---

## 📡 API Documentation

Base URL: `http://localhost:5000/api`

| Method | Endpoint          | Description                              |
|--------|-------------------|-------------------------------------------|
| GET    | `/tasks`          | List tasks (supports `?status=` & `?search=`) |
| GET    | `/tasks/:id`      | Get a single task                        |
| POST   | `/tasks`          | Create a task                            |
| PUT    | `/tasks/:id`      | Update a task (partial update supported) |
| DELETE | `/tasks/:id`      | Delete a task                            |

**Query params on `GET /tasks`**
- `status` — `all` | `pending` | `in-progress` | `completed`
- `search` — case-insensitive title match

**Create/Update body**
```json
{
  "title": "Design onboarding flow",
  "description": "Sketch wireframes for the new user onboarding flow.",
  "status": "pending"
}
```
> `title` is required. `description` is required and must be **≥ 20 characters**. `status` defaults to `"pending"` if omitted.

**Example response — `GET /tasks`**
```json
{
  "success": true,
  "count": 2,
  "stats": { "total": 2, "completed": 1, "pending": 1, "inProgress": 0, "progressPercentage": 50 },
  "data": [ { "id": 1, "title": "...", "description": "...", "status": "pending", "createdAt": "...", "updatedAt": "..." } ]
}
```

**Error response shape (all 4xx/5xx)**
```json
{ "success": false, "message": "Description must be at least 20 characters long." }
```

---

## 🧠 Architecture Notes

- **Backend (MVC):** Routes only wire HTTP verbs to controllers. Controllers hold business logic. Validation middleware runs *before* controllers so invalid data never reaches the database. A single `errorHandler` middleware normalizes every error (including raw Sequelize `SequelizeValidationError`/`SequelizeDatabaseError`) into one consistent JSON shape.
- **Frontend (service layer + hooks):** Components never call `axios` directly — they call functions from `services/taskService.js`. All state, loading flags, and CRUD orchestration live in `useTasks`, keeping `Dashboard.jsx` purely about layout. Each task row tracks its own "pending" state, so deleting one task doesn't disable the whole list.
- **Validation in two places, same rules:** the client (`utils/validators.js`) and the server (`middleware/validateTask.js` + the Sequelize model's `validate` rules) enforce identical rules — instant feedback for the user, with the backend as the unbypassable source of truth.

---

## ☁️ Deployment

### Backend → Render
1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **New Web Service** pointing at the `backend/` folder.
3. Build command: `npm install` · Start command: `npm start`
4. Add environment variables: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` (from a managed MySQL instance — e.g. Render's MySQL/PlanetScale/Railway), `CLIENT_ORIGIN` (your Vercel URL), `NODE_ENV=production`.

### Frontend → Vercel
1. On [Vercel](https://vercel.com), import the repo, set **Root Directory** to `frontend/`.
2. Framework preset: **Vite**.
3. Add environment variable: `VITE_API_BASE_URL=https://<your-render-app>.onrender.com/api`.
4. Deploy.

---

## 📝 Suggested Git Commit History

```
chore: scaffold backend with Express + MySQL (Sequelize) connection
feat: add Task model with validation rules
feat: implement task CRUD controllers and routes
feat: add centralized error handling and validation middleware
chore: scaffold frontend with Vite + Tailwind + dark mode support
feat: build reusable UI primitives (Button, Modal, Badge, Skeleton, EmptyState)
feat: implement useTasks hook for data fetching and mutations
feat: build dashboard stats cards with loading skeletons
feat: implement task filtering, debounced search, and task grid
feat: add create/edit task modal with client-side validation
feat: add delete confirmation dialog and toast notifications
style: polish glassmorphism theme, animations, and responsive layout
docs: add README with setup, API docs, and deployment steps
```

---

## 🎤 Resume Description

> **Smart Project Management Portal** — Built a full-stack task management dashboard (React, Express, MySQL) with real-time filtering/search, dark mode, and animated UI; implemented a clean MVC backend with Sequelize ORM, centralized error handling, and a service-layer frontend architecture using custom React hooks for state management.

---

## 🗣️ Viva / Interview Talking Points

1. **Why MVC on the backend?** Separates HTTP concerns (routes) from business logic (controllers) from data shape (models) — each piece is independently testable and easy to reason about.
2. **Why a service layer on the frontend?** Components stay UI-focused; if the API base URL, auth headers, or endpoint shape change, only `services/` needs to change.
3. **How does validation work end-to-end?** Client-side validation (`utils/validators.js`) gives instant feedback; server-side validation (middleware + the Sequelize model's `validate` rules) is the non-bypassable source of truth — both enforce the exact same rule (description ≥ 20 chars) so there's never a mismatch.
4. **How is loading/error UX handled?** `useTasks` tracks a global `isLoading` flag for the initial fetch and a `pendingIds` Set for per-row mutation state, so deleting one task doesn't freeze the entire list — only that row's buttons disable.
5. **How does dark mode persist?** `ThemeContext` reads `localStorage` on mount (falling back to the OS `prefers-color-scheme`), toggles a `dark` class on `<html>` for Tailwind's `dark:` variants, and writes back to `localStorage` on every change.
6. **How would you scale this?** Add pagination/cursor-based loading on `GET /tasks`, add authentication (JWT) and a `userId` field to scope tasks per user, and add optimistic UI updates instead of re-fetching after each mutation.

---

## 📸 Suggested Screenshots for Your Portfolio

1. Dashboard in **light mode** — stats cards + populated task grid
2. Dashboard in **dark mode** — same view, showing the toggle works
3. **"New Task" modal** open, mid-fill, showing live validation
4. **Empty state** illustration (clear all tasks/filters to show it)
5. **Mobile view** (375px width) showing the responsive stacked layout
