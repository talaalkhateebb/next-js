# auth-api

A simple REST API for user authentication built with Node.js, Express, bcryptjs, and JWT.

---

## What's inside

- User registration with hashed passwords
- Login with JWT token generation
- Protected routes using middleware
- Clean folder structure (controllers / middleware / routes)

---

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your `.env` file

```env
PORT=5000
JWT_SECRET=your_secret_key_here
```

### 3. Run the server

```bash
# development (with nodemon)
npm run dev

# production
npm start
```

---

## API Endpoints

### POST `/api/auth/register`

Creates a new user account.

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### POST `/api/auth/login`

Authenticates the user and returns a JWT token.

**Request body:**
```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### GET `/api/auth/profile` 🔒

Returns the logged-in user's data. Requires a valid token.

**Headers:**
```
Authorization: Bearer <your_token_here>
```

**Response:**
```json
{
  "success": true,
  "message": "Welcome to your profile!",
  "user": {
    "id": 1,
    "email": "user@example.com"
  }
}
```

---

## Project structure

```
auth-api/
├── controllers/
│   └── authController.js      # register & login logic
├── middleware/
│   └── authMiddleware.js       # JWT verification
├── routes/
│   └── authRoutes.router.js    # route definitions
├── .env                        # environment variables
├── package.json
└── server.js                   # entry point
```

---

## Notes

- Passwords are hashed using bcrypt (10 salt rounds) — plain text passwords are never stored
- JWT tokens expire after **1 hour**
- User data is stored in memory for now — swap `users[]` in `authController.js` with a real database when needed
- Always keep `JWT_SECRET` private and never push your `.env` file to version control

---

## Dependencies

| Package | Purpose |
|---------|---------|
| express | Web framework |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT generation & verification |
| dotenv | Environment variable management |
