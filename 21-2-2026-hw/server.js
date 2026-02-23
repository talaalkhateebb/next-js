import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.router.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Mount auth routes under /api/auth
app.use('/api/auth', authRoutes);

// Global error handler - catches errors passed via next(err)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});