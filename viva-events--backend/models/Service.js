const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true
    },
    subtitle: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    currency: {
        type: String,
        default: 'JOD'
    },
    image: {
        type: String
    },
    thumbnail: {
        type: String
    },
    category: {
        type: String,
        enum: ['wedding', 'birthday', 'corporate', 'rental', 'other'],
        default: 'other'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes
serviceSchema.index({ category: 1 });
serviceSchema.index({ isActive: 1 });
serviceSchema.index({ price: 1 });

module.exports = mongoose.model('Service', serviceSchema);
