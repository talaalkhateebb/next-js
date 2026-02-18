const express = require('express');
const app = express();

const logger       = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/products');

// Global Middleware
app.use(express.json());
app.use(logger);

// Routes
app.get('/', (req, res) => {
  res.json({ message: '🛒 Products API – Session 28' });
});
app.use('/api/products', productRoutes);

// Global Error Handler (must be last)
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});