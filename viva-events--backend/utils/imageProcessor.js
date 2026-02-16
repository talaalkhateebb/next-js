const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Process uploaded image - create original and thumbnail
 * @param {string} filePath - Path to the uploaded file
 * @returns {Promise<{original: string, thumbnail: string}>}
 */
const processImage = async (filePath) => {
    try {
        const fileName = path.basename(filePath);
        const fileExt = path.extname(fileName);
        const fileNameWithoutExt = fileName.replace(fileExt, '');
        const dirPath = path.dirname(filePath);

        // Thumbnail filename
        const thumbnailName = `${fileNameWithoutExt}-thumb${fileExt}`;
        const thumbnailPath = path.join(dirPath, thumbnailName);

        // Create thumbnail (300x300)
        await sharp(filePath)
            .resize(300, 300, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({ quality: 80 })
            .toFile(thumbnailPath);

        // Optimize original image (max 1200x1200)
        const tempPath = filePath + '.tmp';
        await sharp(filePath)
            .resize(1200, 1200, {
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 85 })
            .toFile(tempPath);

        // Replace original with optimized version
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        return {
            original: fileName,
            thumbnail: thumbnailName
        };

    } catch (error) {
        console.error('Error processing image:', error);
        throw new Error('Failed to process image');
    }
};

/**
 * Delete image files (original and thumbnail)
 * @param {string} imagePath - Path to image
 * @param {string} thumbnailPath - Path to thumbnail
 */
const deleteImage = async (imagePath, thumbnailPath) => {
    try {
        if (imagePath && fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
        if (thumbnailPath && fs.existsSync(thumbnailPath)) {
            fs.unlinkSync(thumbnailPath);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};

module.exports = { processImage, deleteImage };
