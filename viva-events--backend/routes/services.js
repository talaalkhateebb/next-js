const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
} = require('../controllers/servicesController');

// Public routes
router.get('/', getAllServices);
router.get('/:id', getService);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, upload.single('image'), createService);
router.put('/:id', authMiddleware, adminMiddleware, upload.single('image'), updateService);
router.delete('/:id', authMiddleware, adminMiddleware, deleteService);

module.exports = router;
