const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    }
}, {
    timestamps: true
});

// Compound index to prevent duplicate cart items
cartSchema.index({ user: 1, service: 1 }, { unique: true });

module.exports = mongoose.model('Cart', cartSchema);
