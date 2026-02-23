import express from 'express';
import { register, login } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// ─────────────────────────────────────────────
// Public Routes (no token required)
// ─────────────────────────────────────────────

// POST /api/auth/register → create a new user account
router.post('/register', register);

// POST /api/auth/login → authenticate and receive a JWT token
router.post('/login', login);

// ─────────────────────────────────────────────
// Protected Routes (valid JWT token required)
// ─────────────────────────────────────────────

// GET /api/auth/profile → returns the logged-in user's data
// The "protect" middleware runs first and validates the token
// If valid, req.user will contain the decoded payload
router.get('/profile', protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to your profile!',
    user: req.user,
  });
});

export default router;