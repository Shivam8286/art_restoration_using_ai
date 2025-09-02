const mongoose = require('mongoose');

const restorationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  originalImage: {
    public_id: String,
    url: {
      type: String,
      required: [true, 'Original image is required']
    }
  },
  restoredImage: {
    public_id: String,
    url: String
  },
  technique: {
    type: String,
    required: [true, 'Technique is required'],
    enum: ['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'review', 'completed', 'delivered'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  estimatedDuration: {
    type: Number, // in weeks
    default: 2,
    min: [1, 'Duration must be at least 1 week']
  },
  actualDuration: {
    type: Number // in weeks
  },
  price: {
    type: Number,
    default: 0,
    min: [0, 'Price cannot be negative']
  },
  deposit: {
    type: Number,
    default: 0
  },
  balance: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
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
  milestones: [{
    title: String,
    description: String,
    dueDate: Date,
    completed: {
      type: Boolean,
      default: false
    },
    completedDate: Date
  }],
  tags: [String],
  category: {
    type: String,
    enum: ['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other']
  },
  dimensions: {
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inches', 'mm'],
      default: 'cm'
    }
  },
  materials: [String],
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
  },
  startDate: Date,
  completionDate: Date,
  deliveryDate: Date
}, {
  timestamps: true
});

// Index for better query performance
restorationSchema.index({ client: 1, status: 1 });
restorationSchema.index({ artist: 1, status: 1 });
restorationSchema.index({ technique: 1, category: 1 });

// Virtual for calculating remaining balance
restorationSchema.virtual('remainingBalance').get(function() {
  return this.price - this.deposit;
});

// Method to update progress
restorationSchema.methods.updateProgress = function(progress) {
  this.progress = Math.max(0, Math.min(100, progress));
  return this.save();
};

// Method to add milestone
restorationSchema.methods.addMilestone = function(milestone) {
  this.milestones.push(milestone);
  return this.save();
};

// Method to add note
restorationSchema.methods.addNote = function(content, authorId) {
  this.notes.push({
    content,
    author: authorId,
    timestamp: new Date()
  });
  return this.save();
};

module.exports = mongoose.model('Restoration', restorationSchema);
