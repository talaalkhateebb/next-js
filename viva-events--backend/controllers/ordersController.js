const Order = require('../models/Order');
const Cart = require('../models/Cart');

// ✅ FIXED: Removed mongoose.startSession() / startTransaction()
// Transactions require a MongoDB Replica Set — not available on standalone local MongoDB.
// Sequential operations are safe here since order is created before cart is cleared.

// Create order from cart
const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const { notes } = req.body;

        // Get cart items with populated service data
        const cartItems = await Cart.find({ user: userId }).populate('service');

        if (cartItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Cart is empty'
            });
        }

        // Prepare order items and calculate total
        const orderItems = [];
        let totalPrice = 0;

        for (const item of cartItems) {
            if (!item.service) continue; // skip if service was deleted

            if (!item.service.isActive) {
                return res.status(400).json({
                    success: false,
                    message: `Service "${item.service.title}" is no longer available`
                });
            }

            orderItems.push({
                service:  item.service._id,
                quantity: item.quantity,
                price:    item.service.price
            });

            totalPrice += item.service.price * item.quantity;
        }

        if (orderItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No valid items in cart'
            });
        }

        // Create order (no session/transaction needed)
        const order = await Order.create({
            user:       userId,
            items:      orderItems,
            totalPrice,
            notes:      notes || ''
        });

        // Clear cart after order is successfully created
        await Cart.deleteMany({ user: userId });

        // Return populated order
        const populatedOrder = await Order.findById(order._id)
            .populate('user', 'name email phone')
            .populate('items.service', 'title image');

        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: populatedOrder
        });

    } catch (error) {
        console.error('Create order error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get user's orders
const getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        const orders = await Order.find({ user: userId })
            .populate('items.service', 'title image thumbnail')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: orders
        });

    } catch (error) {
        console.error('Get user orders error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get single order
const getOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: id, user: userId })
            .populate('user', 'name email phone')
            .populate('items.service', 'title image thumbnail');

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, data: order });

    } catch (error) {
        console.error('Get order error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all orders (Admin only)
const getAllOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = {};
        if (status) filter.status = status;

        const orders = await Order.find(filter)
            .populate('user', 'name email phone')
            .populate('items.service', 'title')
            .sort({ createdAt: -1 });

        res.json({ success: true, data: orders });

    } catch (error) {
        console.error('Get all orders error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update order status (Admin only)
const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['pending', 'confirmed', 'cancelled', 'completed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(id, { status }, { new: true });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, message: 'Order status updated' });

    } catch (error) {
        console.error('Update order status error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Cancel order (User — pending orders only)
const cancelOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: id, user: userId });

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (order.status !== 'pending') {
            return res.status(400).json({
                success: false,
                message: 'Only pending orders can be cancelled'
            });
        }

        order.status = 'cancelled';
        await order.save();

        res.json({ success: true, message: 'Order cancelled successfully' });

    } catch (error) {
        console.error('Cancel order error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = {
    createOrder,
    getUserOrders,
    getOrder,
    getAllOrders,
    updateOrderStatus,
    cancelOrder
};