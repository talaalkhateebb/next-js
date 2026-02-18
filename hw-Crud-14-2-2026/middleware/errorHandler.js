// middleware/errorHandler.js
// Catches any error passed via next(err) from controllers

const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: [],
  });
};

module.exports = errorHandler;