const express = require('express');
const { body, validationResult, query } = require('express-validator');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle, processImage } = require('../middleware/upload');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), [
  query('role')
    .optional()
    .isIn(['user', 'admin', 'artist'])
    .withMessage('Invalid role'),
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

    const { role, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (role) filter.role = role;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const users = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await User.countDocuments(filter);

    res.json({
      users,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions - users can only view their own profile unless admin
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to view this user' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('role')
    .optional()
    .isIn(['user', 'admin', 'artist'])
    .withMessage('Invalid role')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    // Only admins can change roles
    if (req.body.role && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to change user role' });
    }

    // Update fields
    Object.keys(req.body).forEach(key => {
      if (key !== 'password' && key !== 'email' && key !== '_id') {
        user[key] = req.body[key];
      }
    });

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar: updatedUser.avatar,
      phone: updatedUser.phone,
      address: updatedUser.address,
      isVerified: updatedUser.isVerified
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'Cannot delete your own account' });
    }

    // Delete user avatar from Cloudinary if it exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    await user.deleteOne();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Upload user avatar
// @route   POST /api/users/:id/avatar
// @access  Private
router.post('/:id/avatar', protect, uploadSingle, processImage, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to update this user' });
    }

    if (!req.processedFiles || req.processedFiles.length === 0) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    // Delete old avatar if it exists
    if (user.avatar?.public_id) {
      await cloudinary.uploader.destroy(user.avatar.public_id);
    }

    // Upload new avatar to Cloudinary
    const result = await cloudinary.uploader.upload(req.processedFiles[0].processed.path, {
      folder: 'avatars',
      transformation: [
        { width: 300, height: 300, crop: 'fill', gravity: 'face' },
        { quality: 'auto:good' }
      ]
    });

    // Clean up local file
    const fs = require('fs');
    if (fs.existsSync(req.processedFiles[0].processed.path)) {
      fs.unlinkSync(req.processedFiles[0].processed.path);
    }

    // Update user avatar
    user.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    };

    await user.save();

    res.json({
      message: 'Avatar uploaded successfully',
      avatar: user.avatar
    });
  } catch (error) {
    console.error('Upload avatar error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user statistics
// @route   GET /api/users/stats/overview
// @access  Private (Admin only)
router.get('/stats/overview', protect, authorize('admin'), async (req, res) => {
  try {
    const total = await User.countDocuments();
    const userCount = await User.countDocuments({ role: 'user' });
    const artistCount = await User.countDocuments({ role: 'artist' });
    const adminCount = await User.countDocuments({ role: 'admin' });
    const verifiedCount = await User.countDocuments({ isVerified: true });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await User.countDocuments({ createdAt: { $gte: today } });

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekCount = await User.countDocuments({ createdAt: { $gte: thisWeek } });

    const thisMonth = new Date();
    thisMonth.setMonth(thisMonth.getMonth() - 1);
    const monthCount = await User.countDocuments({ createdAt: { $gte: thisMonth } });

    res.json({
      total,
      byRole: {
        users: userCount,
        artists: artistCount,
        admins: adminCount
      },
      verification: {
        verified: verifiedCount,
        unverified: total - verifiedCount
      },
      byTime: {
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount
      }
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's restorations
// @route   GET /api/users/:id/restorations
// @access  Private
router.get('/:id/restorations', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check permissions
    if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: 'Not authorized to view this user\'s restorations' });
    }

    const Restoration = require('../models/Restoration');
    const restorations = await Restoration.find({ client: req.params.id })
      .populate('artist', 'name email')
      .sort({ createdAt: -1 });

    res.json(restorations);
  } catch (error) {
    console.error('Get user restorations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get user's portfolio
// @route   GET /api/users/:id/portfolio
// @access  Public
router.get('/:id/portfolio', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const Portfolio = require('../models/Portfolio');
    const portfolio = await Portfolio.find({ 
      artist: req.params.id,
      isPublic: true 
    })
      .populate('client', 'name')
      .sort({ createdAt: -1 });

    res.json(portfolio);
  } catch (error) {
    console.error('Get user portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
