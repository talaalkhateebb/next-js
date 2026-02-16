const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');

// Import routes
const authRoutes = require('./routes/auth');
const servicesRoutes = require('./routes/services');
const cartRoutes = require('./routes/cart');
const ordersRoutes = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'VIVA Events API (MongoDB) is running',
        timestamp: new Date().toISOString(),
        database: 'MongoDB'
    });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', ordersRoutes);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Multer file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum 5MB allowed.'
        });
    }
    
    if (err.message && err.message.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // MongoDB duplicate key error
    if (err.code === 11000) {
        return res.status(400).json({
            success: false,
            message: 'Duplicate entry. This item already exists.'
        });
    }

    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        app.listen(PORT, () => {
            console.log('');
            console.log(' ════════════════════════════════════════════════════');
            console.log('   VIVA Events Backend API (MongoDB)');
            console.log('════════════════════════════════════════════════════ ');
            console.log('');
            console.log(` Server running on: http://localhost:${PORT}`);
            console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
            console.log(` Database: MongoDB`);
            console.log('');
            console.log(' Available endpoints:');
            console.log(`   - Health Check: http://localhost:${PORT}/health`);
            console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
            console.log(`   - Services: http://localhost:${PORT}/api/services`);
            console.log(`   - Cart: http://localhost:${PORT}/api/cart`);
            console.log(`   - Orders: http://localhost:${PORT}/api/orders`);
            console.log('');
            console.log(' Run "npm run seed" to populate database with sample data');
            console.log('');
            console.log('════════════════════════════════════════════════════');
            console.log('');
        });

    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
    process.exit(1);
});

startServer();

module.exports = app;
