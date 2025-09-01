const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [500, 'Description cannot exceed 500 characters']
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
    url: {
      type: String,
      required: [true, 'Restored image is required']
    }
  },
  technique: {
    type: String,
    required: [true, 'Technique is required'],
    enum: ['Color Restoration', 'Damage Repair', 'Complete Reconstruction', 'Digital Enhancement']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Portrait', 'Landscape', 'Still Life', 'Abstract', 'Historical', 'Modern', 'Other']
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  restoration: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restoration'
  },
  tags: [String],
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
  yearCreated: Number,
  yearRestored: Number,
  condition: {
    type: String,
    enum: ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor']
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    default: 'Medium'
  },
  duration: {
    type: Number, // in weeks
    required: [true, 'Duration is required']
  },
  price: {
    type: Number,
    required: [true, 'Price is required']
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String,
      required: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  beforeAfterSlider: {
    type: Boolean,
    default: true
  },
  restorationDetails: {
    challenges: [String],
    solutions: [String],
    techniques: [String],
    tools: [String]
  }
}, {
  timestamps: true
});

// Index for better query performance
portfolioSchema.index({ category: 1, technique: 1 });
portfolioSchema.index({ artist: 1, isPublic: 1 });
portfolioSchema.index({ isFeatured: 1, isPublic: 1 });

// Virtual for like count
portfolioSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
portfolioSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// Method to increment views
portfolioSchema.methods.incrementViews = function() {
  this.views += 1;
  return this.save();
};

// Method to toggle like
portfolioSchema.methods.toggleLike = function(userId) {
  const likeIndex = this.likes.findIndex(like => like.user.toString() === userId.toString());
  
  if (likeIndex > -1) {
    this.likes.splice(likeIndex, 1);
  } else {
    this.likes.push({ user: userId });
  }
  
  return this.save();
};

// Method to add comment
portfolioSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content
  });
  return this.save();
};

// Method to remove comment
portfolioSchema.methods.removeComment = function(commentId) {
  this.comments = this.comments.filter(comment => comment._id.toString() !== commentId.toString());
  return this.save();
};

module.exports = mongoose.model('Portfolio', portfolioSchema);
