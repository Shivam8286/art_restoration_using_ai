const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle, uploadMultiple, uploadPortfolio, processImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// @desc    Upload single image
// @route   POST /api/upload/single
// @access  Private
router.post('/single', protect, uploadSingle, processImage, async (req, res) => {
  try {
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const file = req.processedFiles[0];
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.processed.path, {
      folder: 'uploads',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit' },
        { quality: 'auto:good' }
      ]
    });

    // Clean up local file
    const fs = require('fs');
    if (fs.existsSync(file.processed.path)) {
      fs.unlinkSync(file.processed.path);
    }

    res.json({
      message: 'Image uploaded successfully',
      image: {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      }
    });
  } catch (error) {
    console.error('Upload single image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private
router.post('/multiple', protect, uploadMultiple, processImage, async (req, res) => {
  try {
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload all images to Cloudinary
    const uploadPromises = req.processedFiles.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.processed.path, {
        folder: 'uploads',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      });

      // Clean up local file
      const fs = require('fs');
      if (fs.existsSync(file.processed.path)) {
        fs.unlinkSync(file.processed.path);
      }

      return {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    res.json({
      message: 'Images uploaded successfully',
      images: uploadedImages
    });
  } catch (error) {
    console.error('Upload multiple images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload portfolio images (before/after)
// @route   POST /api/upload/portfolio
// @access  Private (Artist/Admin only)
router.post('/portfolio', protect, authorize('artist', 'admin'), uploadPortfolio, processImage, async (req, res) => {
  try {
    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload images to Cloudinary
    const uploadPromises = req.processedFiles.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.processed.path, {
        folder: 'portfolio',
        transformation: [
          { width: 1200, height: 1200, crop: 'limit' },
          { quality: 'auto:good' }
        ]
      });

      // Clean up local file
      const fs = require('fs');
      if (fs.existsSync(file.processed.path)) {
        fs.unlinkSync(file.processed.path);
      }

      return {
        public_id: result.public_id,
        url: result.secure_url,
        width: result.width,
        height: result.height,
        format: result.format,
        size: result.bytes
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Organize images by type
    const images = {
      original: uploadedImages.find((_, index) => req.files.originalImage && index === 0),
      restored: uploadedImages.find((_, index) => req.files.restoredImage && index === 1)
    };

    res.json({
      message: 'Portfolio images uploaded successfully',
      images
    });
  } catch (error) {
    console.error('Upload portfolio images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete image from Cloudinary
// @route   DELETE /api/upload/:publicId
// @access  Private
router.delete('/:publicId', protect, async (req, res) => {
  try {
    const { publicId } = req.params;

    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({ message: 'Image deleted successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get image info from Cloudinary
// @route   GET /api/upload/info/:publicId
// @access  Private
router.get('/info/:publicId', protect, async (req, res) => {
  try {
    const { publicId } = req.params;

    // Get image info from Cloudinary
    const result = await cloudinary.api.resource(publicId);

    res.json({
      public_id: result.public_id,
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      size: result.bytes,
      created_at: result.created_at
    });
  } catch (error) {
    console.error('Get image info error:', error);
    res.status(404).json({ message: 'Image not found' });
  }
});

// @desc    Transform image URL
// @route   GET /api/upload/transform
// @access  Public
router.get('/transform', async (req, res) => {
  try {
    const { publicId, width, height, crop, quality } = req.query;

    if (!publicId) {
      return res.status(400).json({ message: 'Public ID is required' });
    }

    // Generate transformed URL
    const transformedUrl = cloudinary.url(publicId, {
      width: width ? parseInt(width) : undefined,
      height: height ? parseInt(height) : undefined,
      crop: crop || 'limit',
      quality: quality || 'auto:good'
    });

    res.json({
      transformedUrl,
      originalPublicId: publicId
    });
  } catch (error) {
    console.error('Transform image error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
