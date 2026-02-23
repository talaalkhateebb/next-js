# MERN Auth

A full-stack authentication flow built with MongoDB, Express, React, and Node.js. Part of Session 30 coursework covering frontend/backend integration.

---

## What it does

- Login form that hits an Express REST API
- JWT token stored in `localStorage` after successful auth
- Protected route that requires a valid Bearer token
- Error handling for wrong credentials, missing fields, and invalid tokens
- Session persists across page refreshes

---

## Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Frontend  | React (Create React App)    |
| HTTP      | Axios                       |
| Backend   | Node.js + Express           |
| Auth      | JWT (mocked for dev)        |
| Storage   | localStorage                |

---

## Project structure

```
mern-auth/
├── backend/
│   ├── server.js        # Express server, auth routes
│   └── package.json
└── frontend/
    └── src/
        ├── index.js     # Entry point
        ├── App.js       # Root component, auth state
        ├── Login.js     # Login form + Axios POST
        ├── Dashboard.js # Protected view + token display
        └── App.css      # Styles
```

---

## Getting started

### Prerequisites

- Node.js v18+
- npm

### 1. Clone the repo

```bash
git clone https://github.com/your-username/mern-auth.git
cd mern-auth
```

### 2. Start the backend

```bash
cd backend
npm install
node server.js
```

Server runs on `http://localhost:5000`

### 3. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm start
```

App opens on `http://localhost:3000`

---

## API endpoints

### `POST /api/auth/login`

Authenticates a user and returns a token.

**Request body:**
```json
{
  "email": "ahmed@test.com",
  "password": "1234"
}
```

**Success response `200`:**
```json
{
  "token": "jwt.xxx.signature",
  "user": {
    "id": 1,
    "name": "Ahmed Al-Rashid",
    "email": "ahmed@test.com",
    "role": "Admin"
  }
}
```

**Error response `401`:**
```json
{
  "message": "Invalid email or password."
}
```

---

### `GET /api/profile`

Protected route. Requires a Bearer token in the Authorization header.

**Headers:**
```
Authorization: Bearer <token>
```

**Success response `200`:**
```json
{
  "message": "Access granted. This is a protected route."
}
```

**Error response `401`:**
```json
{
  "message": "Unauthorized. No token provided."
}
```

---

## Test accounts

| Email             | Password | Role      |
|-------------------|----------|-----------|
| ahmed@test.com    | 1234     | Admin     |
| sara@test.com     | 5678     | Developer |

---

## How the auth flow works

```
1. User submits login form
2. React sends POST /api/auth/login via Axios
3. Express checks credentials against the user list
4. On success  → returns token + user data
5. React stores token in localStorage
6. Dashboard loads and reads token from localStorage
7. "Test /api/profile" fires GET with Authorization header
8. Express validates the token and returns protected data
9. Sign out clears localStorage and redirects to login
```

---

## Notes

- The JWT in this project is mocked for simplicity. In production, use the `jsonwebtoken` package to sign and verify real tokens.
- The user list is hardcoded. In production, connect to MongoDB and hash passwords with `bcrypt`.
- CORS is open (`app.use(cors())`). In production, restrict it to your frontend domain.

---

## What's next

- [ ] Connect to MongoDB with Mongoose
- [ ] Hash passwords with bcrypt
- [ ] Sign real JWTs with jsonwebtoken
- [ ] Add registration endpoint
- [ ] Protect frontend routes with a PrivateRoute component
- [ ] Add token expiry and refresh logic
