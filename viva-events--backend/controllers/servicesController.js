const Service = require('../models/Service');
const { processImage, deleteImage } = require('../utils/imageProcessor');
const path = require('path');
const fs = require('fs');

// Get all services
const getAllServices = async (req, res) => {
    try {
        const { category, active } = req.query;
        
        const filter = {};
        
        if (category) {
            filter.category = category;
        }
        
        if (active !== undefined) {
            filter.isActive = active === 'true';
        }

        const services = await Service.find(filter).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: services
        });

    } catch (error) {
        console.error('Get services error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get single service
const getService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.json({
            success: true,
            data: service
        });

    } catch (error) {
        console.error('Get service error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create new service (Admin only)
const createService = async (req, res) => {
    try {
        const { title, subtitle, description, price, currency, category } = req.body;

        // Validate required fields
        if (!title || !price) {
            return res.status(400).json({
                success: false,
                message: 'Title and price are required'
            });
        }

        let imagePath = null;
        let thumbnailPath = null;

        // Process uploaded image
        if (req.file) {
            const processed = await processImage(req.file.path);
            imagePath = `/uploads/services/${processed.original}`;
            thumbnailPath = `/uploads/services/${processed.thumbnail}`;
        }

        // Create service
        const service = await Service.create({
            title,
            subtitle,
            description,
            price,
            currency: currency || 'JOD',
            image: imagePath,
            thumbnail: thumbnailPath,
            category: category || 'other'
        });

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });

    } catch (error) {
        console.error('Create service error:', error);
        
        // Delete uploaded file if error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update service (Admin only)
const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, subtitle, description, price, currency, category, isActive } = req.body;

        // Find service
        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        let imagePath = service.image;
        let thumbnailPath = service.thumbnail;

        // Process new image if uploaded
        if (req.file) {
            // Delete old images
            if (service.image) {
                const oldImagePath = path.join(__dirname, '..', service.image);
                const oldThumbnailPath = path.join(__dirname, '..', service.thumbnail);
                await deleteImage(oldImagePath, oldThumbnailPath);
            }

            // Process new image
            const processed = await processImage(req.file.path);
            imagePath = `/uploads/services/${processed.original}`;
            thumbnailPath = `/uploads/services/${processed.thumbnail}`;
        }

        // Update service
        const updatedService = await Service.findByIdAndUpdate(
            id,
            {
                title: title || service.title,
                subtitle: subtitle !== undefined ? subtitle : service.subtitle,
                description: description !== undefined ? description : service.description,
                price: price || service.price,
                currency: currency || service.currency,
                image: imagePath,
                thumbnail: thumbnailPath,
                category: category || service.category,
                isActive: isActive !== undefined ? isActive : service.isActive
            },
            { new: true }
        );

        res.json({
            success: true,
            message: 'Service updated successfully',
            data: updatedService
        });

    } catch (error) {
        console.error('Update service error:', error);
        
        // Delete uploaded file if error
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete service (Admin only)
const deleteService = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Delete images
        if (service.image) {
            const imagePath = path.join(__dirname, '..', service.image);
            const thumbnailPath = path.join(__dirname, '..', service.thumbnail);
            await deleteImage(imagePath, thumbnailPath);
        }

        // Delete service
        await Service.findByIdAndDelete(id);

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });

    } catch (error) {
        console.error('Delete service error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    getAllServices,
    getService,
    createService,
    updateService,
    deleteService
};
