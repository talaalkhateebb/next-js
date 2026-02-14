
const express = require('express');
const router = express.Router();

const {
  getUsers,
  createUser,
  getUserById,
  deleteUser
} = require('../controllers/userController');

const { 
  protect, 
  logger, 
  validateUser 
} = require('../middleware/authMiddleware');

router.use(logger);
router.get('/users', getUsers);
router.post('/users', validateUser, createUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', protect, deleteUser);

module.exports = router;