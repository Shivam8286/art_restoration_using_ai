const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Restoration = require('../models/Restoration');
const { protect, authorize } = require('../middleware/auth');
const { uploadPortfolio, processImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// @desc    Create new restoration project
// @route   POST /api/restorations
// @access  Private
router.post('/', protect, [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('technique')
    .isIn(['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement'])
    .withMessage('Invalid technique'),
  body('estimatedDuration')
    .isInt({ min: 1 })
    .withMessage('Estimated duration must be at least 1 week'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('category')
    .optional()
    .isIn(['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other'])
    .withMessage('Invalid category')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const restorationData = {
      ...req.body,
      client: req.user._id
    };

    const restoration = await Restoration.create(restorationData);
    
    const populatedRestoration = await Restoration.findById(restoration._id)
      .populate('client', 'name email')
      .populate('artist', 'name email');

    res.status(201).json(populatedRestoration);
  } catch (error) {
    console.error('Create restoration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all restorations (with filters)
// @route   GET /api/restorations
// @access  Private
router.get('/', protect, [
  query('status')
    .optional()
    .isIn(['pending', 'in-progress', 'review', 'completed', 'delivered'])
    .withMessage('Invalid status'),
  query('technique')
    .optional()
    .isIn(['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement'])
    .withMessage('Invalid technique'),
  query('category')
    .optional()
    .isIn(['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other'])
    .withMessage('Invalid category'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage('Limit must be between 1 and 50')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const { status, technique, category, page = 1, limit = 10 } = req.query;
    
    // Build filter object
    const filter = {};
    
    // Role-based filtering
    if (req.user.role === 'admin') {
      // Admins can see all restorations
    } else if (req.user.role === 'artist') {
      // Artists can see their own restorations and assigned ones
      filter.$or = [
        { artist: req.user._id },
        { status: 'pending' } // Can see pending restorations to potentially accept
      ];
    } else {
      // Regular users can only see their own restorations
      filter.client = req.user._id;
    }

    // Apply additional filters
    if (status) filter.status = status;
    if (technique) filter.technique = technique;
    if (category) filter.category = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const restorations = await Restoration.find(filter)
      .populate('client', 'name email')
      .populate('artist', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Restoration.countDocuments(filter);

    res.json({
      restorations,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get restorations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single restoration
// @route   GET /api/restorations/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const restoration = await Restoration.findById(req.params.id)
      .populate('client', 'name email phone address')
      .populate('artist', 'name email phone')
      .populate('notes.author', 'name');

    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    // Check access permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'artist' && 
        restoration.client._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this restoration' });
    }

    res.json(restoration);
  } catch (error) {
    console.error('Get restoration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update restoration
// @route   PUT /api/restorations/:id
// @access  Private
router.put('/:id', protect, [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'review', 'completed', 'delivered'])
    .withMessage('Invalid status'),
  body('progress')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const restoration = await Restoration.findById(req.params.id);
    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'artist' && 
        restoration.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this restoration' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'client' && key !== '_id') {
        restoration[key] = req.body[key];
      }
    });

    const updatedRestoration = await restoration.save();
    
    const populatedRestoration = await Restoration.findById(updatedRestoration._id)
      .populate('client', 'name email')
      .populate('artist', 'name email');

    res.json(populatedRestoration);
  } catch (error) {
    console.error('Update restoration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete restoration
// @route   DELETE /api/restorations/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const restoration = await Restoration.findById(req.params.id);
    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    // Delete images from Cloudinary if they exist
    if (restoration.originalImage?.public_id) {
      await cloudinary.uploader.destroy(restoration.originalImage.public_id);
    }
    if (restoration.restoredImage?.public_id) {
      await cloudinary.uploader.destroy(restoration.restoredImage.public_id);
    }

    await restoration.deleteOne();

    res.json({ message: 'Restoration deleted successfully' });
  } catch (error) {
    console.error('Delete restoration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload restoration images
// @route   POST /api/restorations/:id/images
// @access  Private
router.post('/:id/images', protect, uploadPortfolio, processImage, async (req, res) => {
  try {
    const restoration = await Restoration.findById(req.params.id);
    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'artist' && 
        restoration.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this restoration' });
    }

    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No images uploaded' });
    }

    // Upload to Cloudinary
    const uploadPromises = req.processedFiles.map(async (file) => {
      const result = await cloudinary.uploader.upload(file.processed.path, {
        folder: 'restorations',
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

    // Update restoration with images
    if (req.body.type === 'restored' && uploadedImages[0]) {
      restoration.restoredImage = uploadedImages[0];
    } else if (uploadedImages[0]) {
      restoration.originalImage = uploadedImages[0];
    }

    await restoration.save();

    res.json({
      message: 'Images uploaded successfully',
      restoration
    });
  } catch (error) {
    console.error('Upload images error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add note to restoration
// @route   POST /api/restorations/:id/notes
// @access  Private
router.post('/:id/notes', protect, [
  body('content')
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage('Note content must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const restoration = await Restoration.findById(req.params.id);
    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && 
        req.user.role !== 'artist' && 
        restoration.client.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to add notes to this restoration' });
    }

    await restoration.addNote(req.body.content, req.user._id);

    const updatedRestoration = await Restoration.findById(restoration._id)
      .populate('notes.author', 'name');

    res.json(updatedRestoration.notes);
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update restoration progress
// @route   PUT /api/restorations/:id/progress
// @access  Private (Artist/Admin only)
router.put('/:id/progress', protect, authorize('artist', 'admin'), [
  body('progress')
    .isInt({ min: 0, max: 100 })
    .withMessage('Progress must be between 0 and 100')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const restoration = await Restoration.findById(req.params.id);
    if (!restoration) {
      return res.status(404).json({ message: 'Restoration not found' });
    }

    await restoration.updateProgress(req.body.progress);

    res.json({ message: 'Progress updated successfully', progress: restoration.progress });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
