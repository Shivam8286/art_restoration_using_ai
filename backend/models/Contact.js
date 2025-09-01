const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    match: [/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  inquiryType: {
    type: String,
    enum: ['General', 'Restoration Request', 'Portfolio Inquiry', 'Pricing', 'Partnership', 'Other'],
    default: 'General'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'closed'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String],
  source: {
    type: String,
    enum: ['Website', 'Email', 'Phone', 'Social Media', 'Referral', 'Other'],
    default: 'Website'
  },
  attachments: [{
    filename: String,
    originalName: String,
    public_id: String,
    url: String,
    size: Number,
    mimeType: String
  }],
  notes: [{
    content: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  followUpDate: Date,
  isSpam: {
    type: Boolean,
    default: false
  },
  ipAddress: String,
  userAgent: String,
  referrer: String
}, {
  timestamps: true
});

// Index for better query performance
contactSchema.index({ status: 1, priority: 1 });
contactSchema.index({ assignedTo: 1, status: 1 });
contactSchema.index({ createdAt: -1 });

// Method to mark as read
contactSchema.methods.markAsRead = function() {
  this.status = 'read';
  return this.save();
};

// Method to assign to user
contactSchema.methods.assignTo = function(userId) {
  this.assignedTo = userId;
  return this.save();
};

// Method to add note
contactSchema.methods.addNote = function(content, authorId) {
  this.notes.push({
    content,
    author: authorId,
    timestamp: new Date()
  });
  return this.save();
};

// Method to update status
contactSchema.methods.updateStatus = function(newStatus) {
  this.status = newStatus;
  return this.save();
};

// Method to set follow-up date
contactSchema.methods.setFollowUpDate = function(date) {
  this.followUpDate = date;
  return this.save();
};

module.exports = mongoose.model('Contact', contactSchema);
