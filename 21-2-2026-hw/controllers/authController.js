import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Temporary in-memory storage (replace with a real database in production)
const users = [];

// ─────────────────────────────────────────────
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
// ─────────────────────────────────────────────
export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Check if a user with the same email already exists
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // Hash the password before saving (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and store the new user
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
    };
    users.push(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
    });
  } catch (err) {
    next(err);
  }
};

// ─────────────────────────────────────────────
// @desc    Login an existing user
// @route   POST /api/auth/login
// @access  Public
// ─────────────────────────────────────────────
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate that email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    // Find the user by email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    // Generate a JWT token valid for 1 hour
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
    });
  } catch (err) {
    next(err);
  }
};