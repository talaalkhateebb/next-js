
const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to Express API',
    endpoints: {
      getAllUsers: 'GET /api/users',
      createUser: 'POST /api/users',
      getUser: 'GET /api/users/:id',
      deleteUser: 'DELETE /api/users/:id (Protected)'
    }
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});