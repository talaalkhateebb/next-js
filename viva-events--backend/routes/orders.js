const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const {
    createOrder,
    getUserOrders,
    getOrder,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/ordersController');

// User routes (require authentication)
router.post('/', authMiddleware, createOrder);
router.get('/my-orders', authMiddleware, getUserOrders);
router.get('/:id', authMiddleware, getOrder);
router.patch('/:id/cancel', authMiddleware, cancelOrder);

// Admin routes
router.get('/', authMiddleware, adminMiddleware, getAllOrders);
router.patch('/:id/status', authMiddleware, adminMiddleware, updateOrderStatus);

module.exports = router;
