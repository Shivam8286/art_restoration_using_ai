const express = require('express');
const { body, validationResult, query } = require('express-validator');
const Contact = require('../models/Contact');
const { protect, authorize } = require('../middleware/auth');
const { uploadMultiple, processImage } = require('../middleware/upload');
const sendEmail = require('../utils/email');

const router = express.Router();

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 2000 })
    .withMessage('Message must be between 10 and 2000 characters'),
  body('phone')
    .optional()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  body('inquiryType')
    .optional()
    .isIn(['General', 'Restoration Request', 'Portfolio Inquiry', 'Pricing', 'Partnership', 'Other'])
    .withMessage('Invalid inquiry type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const contactData = {
      ...req.body,
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referrer: req.get('Referer')
    };

    // Basic spam detection
    if (contactData.message.toLowerCase().includes('http') || 
        contactData.message.toLowerCase().includes('www')) {
      contactData.isSpam = true;
    }

    const contact = await Contact.create(contactData);

    // Send confirmation email to user
    try {
      await sendEmail({
        email: contact.email,
        subject: 'Thank you for contacting AI Art Restoration',
        message: `
          <h2>Thank you for your message!</h2>
          <p>Dear ${contact.name},</p>
          <p>We have received your inquiry and will get back to you within 24-48 hours.</p>
          <p><strong>Your message:</strong></p>
          <p>${contact.message}</p>
          <p>Best regards,<br>AI Art Restoration Team</p>
        `
      });
    } catch (emailError) {
      console.error('Confirmation email failed:', emailError);
      // Continue even if email fails
    }

    // Send notification to admin (if configured)
    if (process.env.ADMIN_EMAIL) {
      try {
        await sendEmail({
          email: process.env.ADMIN_EMAIL,
          subject: `New Contact Form Submission: ${contact.subject}`,
          message: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${contact.name} (${contact.email})</p>
            <p><strong>Subject:</strong> ${contact.subject}</p>
            <p><strong>Type:</strong> ${contact.inquiryType}</p>
            <p><strong>Message:</strong></p>
            <p>${contact.message}</p>
            <p><strong>Phone:</strong> ${contact.phone || 'Not provided'}</p>
            <p><strong>IP Address:</strong> ${contact.ipAddress}</p>
            <p><strong>Timestamp:</strong> ${contact.createdAt}</p>
          `
        });
      } catch (adminEmailError) {
        console.error('Admin notification email failed:', adminEmailError);
      }
    }

    res.status(201).json({
      message: 'Contact form submitted successfully',
      contactId: contact._id
    });
  } catch (error) {
    console.error('Submit contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get all contact submissions (Admin only)
// @route   GET /api/contact
// @access  Private (Admin only)
router.get('/', protect, authorize('admin'), [
  query('status')
    .optional()
    .isIn(['new', 'read', 'replied', 'closed'])
    .withMessage('Invalid status'),
  query('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Invalid priority'),
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

    const { status, priority, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await Contact.find(filter)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Contact.countDocuments(filter);

    res.json({
      contacts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get single contact submission
// @route   GET /api/contact/:id
// @access  Private (Admin only)
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.author', 'name');

    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    res.json(contact);
  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Update contact status
// @route   PUT /api/contact/:id/status
// @access  Private (Admin only)
router.put('/:id/status', protect, authorize('admin'), [
  body('status')
    .isIn(['new', 'read', 'replied', 'closed'])
    .withMessage('Invalid status'),
  body('assignedTo')
    .optional()
    .isMongoId()
    .withMessage('Invalid user ID')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    contact.status = req.body.status;
    if (req.body.assignedTo) {
      contact.assignedTo = req.body.assignedTo;
    }

    await contact.save();

    res.json({ message: 'Status updated successfully', contact });
  } catch (error) {
    console.error('Update contact status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Add note to contact
// @route   POST /api/contact/:id/notes
// @access  Private (Admin only)
router.post('/:id/notes', protect, authorize('admin'), [
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

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await contact.addNote(req.body.content, req.user._id);

    const updatedContact = await Contact.findById(contact._id)
      .populate('notes.author', 'name');

    res.json(updatedContact.notes);
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Reply to contact
// @route   POST /api/contact/:id/reply
// @access  Private (Admin only)
router.post('/:id/reply', protect, authorize('admin'), [
  body('message')
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Reply message must be between 1 and 2000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed',
        errors: errors.array() 
      });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    // Send reply email
    try {
      await sendEmail({
        email: contact.email,
        subject: `Re: ${contact.subject}`,
        message: `
          <h2>Response to your inquiry</h2>
          <p>Dear ${contact.name},</p>
          <p>${req.body.message}</p>
          <p>Best regards,<br>AI Art Restoration Team</p>
        `
      });

      // Update contact status
      contact.status = 'replied';
      await contact.save();

      res.json({ message: 'Reply sent successfully' });
    } catch (emailError) {
      console.error('Reply email failed:', emailError);
      res.status(500).json({ message: 'Failed to send reply email' });
    }
  } catch (error) {
    console.error('Reply to contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Delete contact submission
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact submission not found' });
    }

    await contact.deleteOne();

    res.json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    console.error('Delete contact error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @desc    Get contact statistics
// @route   GET /api/contact/stats/overview
// @access  Private (Admin only)
router.get('/stats/overview', protect, authorize('admin'), async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: 'new' });
    const readCount = await Contact.countDocuments({ status: 'read' });
    const repliedCount = await Contact.countDocuments({ status: 'replied' });
    const closedCount = await Contact.countDocuments({ status: 'closed' });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayCount = await Contact.countDocuments({ createdAt: { $gte: today } });

    const thisWeek = new Date();
    thisWeek.setDate(thisWeek.getDate() - 7);
    const weekCount = await Contact.countDocuments({ createdAt: { $gte: thisWeek } });

    res.json({
      total,
      byStatus: {
        new: newCount,
        read: readCount,
        replied: repliedCount,
        closed: closedCount
      },
      byTime: {
        today: todayCount,
        thisWeek: weekCount
      }
    });
  } catch (error) {
    console.error('Get contact stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
