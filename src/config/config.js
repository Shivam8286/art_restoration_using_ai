const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // App Configuration
  APP_NAME: 'AI Art Restoration',
  APP_VERSION: '1.0.0',
  
  // Feature Flags
  FEATURES: {
    AUTHENTICATION: true,
    FILE_UPLOAD: true,
    REAL_TIME_UPDATES: false,
    ANALYTICS: false
  },
  
  // Upload Configuration
  UPLOAD: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_FILE_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'image/tiff'],
    MAX_FILES: 5
  },
  
  // Pagination
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100
  },
  
  // Contact Form
  CONTACT: {
    INQUIRY_TYPES: [
      'General',
      'Restoration Request',
      'Portfolio Inquiry',
      'Pricing',
      'Partnership',
      'Other'
    ]
  },
  
  // Restoration Statuses
  RESTORATION_STATUSES: [
    'pending',
    'in-progress',
    'review',
    'completed',
    'delivered'
  ],
  
  // User Roles
  USER_ROLES: {
    USER: 'user',
    ARTIST: 'artist',
    ADMIN: 'admin'
  }
};

export default config;
