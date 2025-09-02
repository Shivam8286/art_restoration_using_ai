const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG and WebP images are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
    files: 5 // Maximum 5 files per request
  }
});

// Image processing middleware
const processImage = async (req, res, next) => {
  // Normalize to an array for both single and multiple uploads
  const incomingFiles = Array.isArray(req.files)
    ? req.files
    : (req.file ? [req.file] : []);

  if (incomingFiles.length === 0) {
    return next();
  }

  try {
    const processedFiles = [];

    for (const file of incomingFiles) {
      const filePath = file.path;
      const fileName = file.filename;
      const outputPath = path.join(uploadsDir, 'processed-' + fileName);

      // Process image with Sharp
      await sharp(filePath)
        .resize(1200, 1200, { 
          fit: 'inside', 
          withoutEnlargement: true 
        })
        .jpeg({ 
          quality: 85, 
          progressive: true 
        })
        .toFile(outputPath);

      // Add processed file info to request
      processedFiles.push({
        original: {
          filename: file.filename,
          path: filePath,
          size: file.size,
          mimetype: file.mimetype
        },
        processed: {
          filename: 'processed-' + fileName,
          path: outputPath,
          mimetype: 'image/jpeg'
        }
      });

      // Remove original file
      fs.unlinkSync(filePath);
    }

    req.processedFiles = processedFiles;
    next();
  } catch (error) {
    console.error('Image processing error:', error);
    return res.status(500).json({ message: 'Error processing images' });
  }
};

// Single file upload
const uploadSingle = upload.single('image');

// Multiple files upload
const uploadMultiple = upload.array('images', 5);

// Portfolio upload (before/after images)
const uploadPortfolio = upload.fields([
  { name: 'originalImage', maxCount: 1 },
  { name: 'restoredImage', maxCount: 1 }
]);

module.exports = {
  uploadSingle,
  uploadMultiple,
  uploadPortfolio,
  processImage
};
