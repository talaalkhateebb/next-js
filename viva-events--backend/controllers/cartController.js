const Cart = require('../models/Cart');
const Service = require('../models/Service');

// Get user's cart
const getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cartItems = await Cart.find({ user: userId })
            .populate('service', 'title subtitle description price currency image thumbnail category')
            .sort({ createdAt: -1 });

        // Calculate total
        const total = cartItems.reduce((sum, item) => {
            return sum + (item.service.price * item.quantity);
        }, 0);

        res.json({
            success: true,
            data: {
                items: cartItems,
                total: total.toFixed(2),
                count: cartItems.length
            }
        });

    } catch (error) {
        console.error('Get cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { service_id, quantity } = req.body;

        // Validate input
        if (!service_id) {
            return res.status(400).json({
                success: false,
                message: 'Service ID is required'
            });
        }

        // Check if service exists
        const service = await Service.findOne({ _id: service_id, isActive: true });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found or inactive'
            });
        }

        const qty = parseInt(quantity) || 1;

        // Check if item already in cart
        const existingItem = await Cart.findOne({ user: userId, service: service_id });

        if (existingItem) {
            // Update quantity
            existingItem.quantity += qty;
            await existingItem.save();
        } else {
            // Add new item
            await Cart.create({
                user: userId,
                service: service_id,
                quantity: qty
            });
        }

        // Get updated cart
        const cartItems = await Cart.find({ user: userId })
            .populate('service', 'title price image thumbnail');

        res.json({
            success: true,
            message: 'Item added to cart',
            data: {
                items: cartItems,
                count: cartItems.length
            }
        });

    } catch (error) {
        console.error('Add to cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update cart item quantity
const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cart_id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Invalid quantity'
            });
        }

        // Update quantity
        const cartItem = await Cart.findOneAndUpdate(
            { _id: cart_id, user: userId },
            { quantity },
            { new: true }
        );

        if (!cartItem) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        res.json({
            success: true,
            message: 'Cart updated'
        });

    } catch (error) {
        console.error('Update cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cart_id } = req.params;

        const result = await Cart.findOneAndDelete({ _id: cart_id, user: userId });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Cart item not found'
            });
        }

        res.json({
            success: true,
            message: 'Item removed from cart'
        });

    } catch (error) {
        console.error('Remove from cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Clear entire cart
const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        await Cart.deleteMany({ user: userId });

        res.json({
            success: true,
            message: 'Cart cleared'
        });

    } catch (error) {
        console.error('Clear cart error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
};
