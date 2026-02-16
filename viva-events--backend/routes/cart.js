const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
} = require('../controllers/cartController');

// All cart routes require authentication
router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/:cart_id', updateCartItem);
router.delete('/:cart_id', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
