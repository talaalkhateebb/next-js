const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    register,
    login,
    getProfile,
    registerValidation,
    loginValidation
} = require('../controllers/authController');

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

// Protected routes
router.get('/profile', authMiddleware, getProfile);

module.exports = router;
