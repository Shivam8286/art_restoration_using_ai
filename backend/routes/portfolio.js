const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Portfolio = require('../models/Portfolio');
const { protect, authorize, optionalAuth } = require('../middleware/auth');
const { uploadPortfolio, processImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// @desc    Get all portfolio items (public)
// @route   GET /api/portfolio
// @access  Public
router.get('/', optionalAuth, [
  query('category')
    .optional()
    .isIn(['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other'])
    .withMessage('Invalid category'),
  query('technique')
    .optional()
    .isIn(['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement'])
    .withMessage('Invalid technique'),
  query('featured')
    .optional()
    .isBoolean()
    .withMessage('Featured must be a boolean'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage('Limit must be between 1 and 20')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { category, technique, featured, page = 1, limit = 12 } = req.query;
    
    // Build filter object - only show public items
    const filter = { isPublic: true };
    
    if (category) filter.category = category;
    if (technique) filter.technique = technique;
    if (featured !== undefined) filter.isFeatured = featured === 'true';

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const portfolio = await Portfolio.find(filter)
      .populate('artist', 'name')
      .populate('client', 'name')
      .sort({ isFeatured: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Portfolio.countDocuments(filter);

    res.json({
      portfolio,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get featured portfolio items
// @route   GET /api/portfolio/featured
// @access  Public
router.get('/featured', async (req, res) => {
  try {
    const featuredItems = await Portfolio.find({ 
      isFeatured: true, 
      isPublic: true 
    })
      .populate('artist', 'name')
      .populate('client', 'name')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json(featuredItems);
  } catch (error) {
    console.error('Get featured portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id)
      .populate('artist', 'name email phone')
      .populate('client', 'name')
      .populate('comments.user', 'name avatar');

    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Check if item is public
    if (!portfolioItem.isPublic && (!req.user || req.user.role !== 'admin')) {
      return res.status(403).json({ message: 'This portfolio item is not public' });
    }

    // Increment view count
    await portfolioItem.incrementViews();

    res.json(portfolioItem);
  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private (Artist/Admin only)
router.post('/', protect, authorize('artist', 'admin'), [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('technique')
    .isIn(['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement'])
    .withMessage('Invalid technique'),
  body('category')
    .isIn(['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other'])
    .withMessage('Invalid category'),
  body('duration')
    .isInt({ min: 1 })
    .withMessage('Duration must be at least 1 week'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const portfolioData = {
      ...req.body,
      artist: req.user._id
    };

    const portfolioItem = await Portfolio.create(portfolioData);
    
    const populatedPortfolio = await Portfolio.findById(portfolioItem._id)
      .populate('artist', 'name email')
      .populate('client', 'name');

    res.status(201).json(populatedPortfolio);
  } catch (error) {
    console.error('Create portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private (Owner/Admin only)
router.put('/:id', protect, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Description must be between 10 and 500 characters'),
  body('isPublic')
    .optional()
    .isBoolean()
    .withMessage('isPublic must be a boolean')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        portfolioItem.artist.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this portfolio item' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'artist' && key !== '_id') {
        portfolioItem[key] = req.body[key];
      }
    });

    const updatedPortfolio = await portfolioItem.save();
    
    const populatedPortfolio = await Portfolio.findById(updatedPortfolio._id)
      .populate('artist', 'name email')
      .populate('client', 'name');

    res.json(populatedPortfolio);
  } catch (error) {
    console.error('Update portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private (Owner/Admin only)
router.delete('/:id', protect, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        portfolioItem.artist.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this portfolio item' });
    }

    // Delete images from Cloudinary
    if (portfolioItem.originalImage?.public_id) {
      await cloudinary.uploader.destroy(portfolioItem.originalImage.public_id);
    }
    if (portfolioItem.restoredImage?.public_id) {
      await cloudinary.uploader.destroy(portfolioItem.restoredImage.public_id);
    }

    await portfolioItem.deleteOne();

    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload portfolio images
// @route   POST /api/portfolio/:id/images
// @access  Private (Owner/Admin only)
router.post('/:id/images', protect, uploadPortfolio, processImage, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        portfolioItem.artist.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this portfolio item' });
    }

    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload to Cloudinary
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
        url: result.secure_url
      };
    });

    const uploadedImages = await Promise.all(uploadPromises);

    // Update portfolio with images
    if (req.body.type === 'restored' && uploadedImages[0]) {
      portfolioItem.restoredImage = uploadedImages[0];
    } else if (uploadedImages[0]) {
      portfolioItem.originalImage = uploadedImages[0];
    }

    await portfolioItem.save();

    res.json({
      message: 'Images uploaded successfully',
      portfolio: portfolioItem
    });
  } catch (error) {
    console.error('Upload portfolio images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Toggle like on portfolio item
// @route   POST /api/portfolio/:id/like
// @access  Private
router.post('/:id/like', protect, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    await portfolioItem.toggleLike(req.user._id);

    res.json({ 
      message: 'Like toggled successfully',
      likeCount: portfolioItem.likeCount
    });
  } catch (error) {
    console.error('Toggle like error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add comment to portfolio item
// @route   POST /api/portfolio/:id/comments
// @access  Private
router.post('/:id/comments', protect, [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Comment must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    await portfolioItem.addComment(req.user._id, req.body.content);

    const updatedPortfolio = await Portfolio.findById(portfolioItem._id)
      .populate('comments.user', 'name avatar');

    res.json(updatedPortfolio.comments);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Remove comment from portfolio item
// @route   DELETE /api/portfolio/:id/comments/:commentId
// @access  Private (Comment author/Admin only)
router.delete('/:id/comments/:commentId', protect, async (req, res) => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }

    const comment = portfolioItem.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        comment.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await portfolioItem.removeComment(req.params.commentId);

    res.json({ message: 'Comment removed successfully' });
  } catch (error) {
    console.error('Remove comment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
