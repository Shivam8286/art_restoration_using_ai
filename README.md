# AI Art Restoration Platform

A modern, responsive web application that showcases AI-powered art restoration services using cutting-edge machine learning technology to revive damaged traditional artworks.

## 🎨 Project Overview

This platform demonstrates how artificial intelligence can be used to restore damaged artworks to their original glory. It features a comprehensive showcase of restoration services, portfolio examples, and an intuitive user interface for art enthusiasts, collectors, and restoration professionals.

## ✨ Features

### Core Functionality
- **AI Restoration Services Showcase** - Three main service tiers with detailed descriptions
- **Interactive Portfolio Gallery** - Before/after restoration comparisons with hover effects
- **Responsive Design** - Mobile-first approach with modern UI/UX principles
- **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- **Professional Layout** - Clean, art-focused design with elegant typography

### Service Offerings
1. **Color Restoration** - AI-powered color correction and fade reversal
2. **Damage Repair** - Repair tears, scratches, and physical damage
3. **Complete Reconstruction** - Full digital reconstruction of severely damaged artworks

### Technical Features
- **Modern React Architecture** - Built with React 18 and React Router v6
- **Tailwind CSS Styling** - Custom color palette and component system
- **Responsive Navigation** - Multi-page routing with consistent layout
- **Performance Optimized** - Efficient rendering and smooth animations

## 🛠️ Technology Stack

### Frontend
- **React 18.2.0** - Modern React with hooks and functional components
- **React Router DOM 6.8.1** - Client-side routing and navigation
- **Framer Motion 10.16.4** - Smooth animations and transitions
- **Lucide React 0.263.1** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js 4.18.2** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **Cloudinary** - Cloud-based image storage and processing
- **Multer** - File upload middleware
- **Sharp** - High-performance image processing
- **Nodemailer** - Email sending functionality

### Styling & UI
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **PostCSS 8.4.24** - CSS processing and optimization
- **Autoprefixer 10.4.14** - Automatic vendor prefixing
- **Custom Design System** - Tailored color palette and typography

### Development Tools
- **Create React App** - Modern React development environment
- **Nodemon** - Development server with auto-restart
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code quality and consistency
- **Jest & Testing Library** - Unit testing framework

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- MongoDB (local installation or MongoDB Atlas)
- Cloudinary account (for image storage)
- Email service (Gmail, SendGrid, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd art
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp env.example .env
   
   # Edit the .env file with your configuration
   nano .env
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB (if running locally)
   mongod
   
   # Or use MongoDB Atlas cloud database
   # Update MONGODB_URI in .env file
   ```

5. **Start the development servers**
   ```bash
   # Start both frontend and backend concurrently
   npm run dev
   
   # Or start them separately:
   # Backend only
   npm run server:dev
   
   # Frontend only
   npm start
   ```

6. **Open your browser**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000/api`

### Available Scripts

#### Frontend Scripts
- `npm start` - Runs the React app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

#### Backend Scripts
- `npm run server` - Runs the backend server in production mode
- `npm run server:dev` - Runs the backend server in development mode with nodemon
- `npm run dev` - Runs both frontend and backend concurrently

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ai-art-restoration

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@yourdomain.com

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📁 Project Structure

```
├── src/                 # Frontend React application
│   ├── components/      # Reusable UI components
│   │   ├── ArtworkCard.js
│   │   ├── Footer.js
│   │   ├── Navbar.js
│   │   └── RestorationCard.js
│   ├── pages/           # Main application pages
│   │   ├── About.js
│   │   ├── Artists.js
│   │   ├── Contact.js
│   │   ├── Gallery.js
│   │   ├── Home.js
│   │   ├── Portfolio.js
│   │   └── Services.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── backend/             # Backend Node.js/Express API
│   ├── config/          # Configuration files
│   │   ├── database.js
│   │   └── cloudinary.js
│   ├── middleware/      # Custom middleware
│   │   ├── auth.js
│   │   └── upload.js
│   ├── models/          # MongoDB models
│   │   ├── User.js
│   │   ├── Restoration.js
│   │   ├── Portfolio.js
│   │   └── Contact.js
│   ├── routes/          # API routes
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── restorations.js
│   │   ├── portfolio.js
│   │   ├── contact.js
│   │   └── upload.js
│   ├── utils/           # Utility functions
│   │   └── email.js
│   ├── uploads/         # Local file uploads (temporary)
│   └── server.js        # Main server file
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── env.example          # Environment variables template
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary Colors**: Warm orange tones (#ed7514) for brand identity
- **Secondary Colors**: Cool gray tones (#64748b) for text and UI elements
- **Accent Colors**: Complementary shades for highlights and interactions

### Typography
- **Display Font**: Playfair Display for headings and titles
- **Body Font**: Inter for body text and UI elements
- **Responsive Scaling**: Fluid typography that adapts to screen sizes

### Components
- **Cards**: Elevated design with hover effects and shadows
- **Buttons**: Primary and secondary button styles with hover states
- **Navigation**: Clean, accessible navigation with smooth transitions

## 🔧 Customization

### Adding New Services
1. Update the `services` array in `src/pages/Services.js`
2. Add corresponding icons from Lucide React
3. Update pricing and duration information

### Modifying the Portfolio
1. Edit the `featuredRestorations` array in `src/pages/Home.js`
2. Add new restoration examples with before/after images
3. Update technique descriptions and timeframes

### Styling Changes
1. Modify `tailwind.config.js` for color and font changes
2. Update `src/index.css` for custom component styles
3. Use Tailwind utility classes for rapid prototyping

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### User Management
- `GET /api/users` - Get all users (Admin only)
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (Admin only)
- `POST /api/users/:id/avatar` - Upload user avatar
- `GET /api/users/stats/overview` - User statistics (Admin only)

### Restoration Management
- `POST /api/restorations` - Create restoration project
- `GET /api/restorations` - Get all restorations (with filters)
- `GET /api/restorations/:id` - Get single restoration
- `PUT /api/restorations/:id` - Update restoration
- `DELETE /api/restorations/:id` - Delete restoration (Admin only)
- `POST /api/restorations/:id/images` - Upload restoration images
- `POST /api/restorations/:id/notes` - Add note to restoration
- `PUT /api/restorations/:id/progress` - Update restoration progress

### Portfolio Management
- `GET /api/portfolio` - Get all portfolio items (public)
- `GET /api/portfolio/featured` - Get featured portfolio items
- `GET /api/portfolio/:id` - Get single portfolio item
- `POST /api/portfolio` - Create portfolio item (Artist/Admin only)
- `PUT /api/portfolio/:id` - Update portfolio item
- `DELETE /api/portfolio/:id` - Delete portfolio item
- `POST /api/portfolio/:id/images` - Upload portfolio images
- `POST /api/portfolio/:id/like` - Toggle like on portfolio item
- `POST /api/portfolio/:id/comments` - Add comment to portfolio item
- `DELETE /api/portfolio/:id/comments/:commentId` - Remove comment

### Contact Management
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contact submissions (Admin only)
- `GET /api/contact/:id` - Get single contact submission (Admin only)
- `PUT /api/contact/:id/status` - Update contact status (Admin only)
- `POST /api/contact/:id/notes` - Add note to contact (Admin only)
- `POST /api/contact/:id/reply` - Reply to contact (Admin only)
- `DELETE /api/contact/:id` - Delete contact submission (Admin only)
- `GET /api/contact/stats/overview` - Contact statistics (Admin only)

### File Upload
- `POST /api/upload/single` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images
- `POST /api/upload/portfolio` - Upload portfolio images (Artist/Admin only)
- `DELETE /api/upload/:publicId` - Delete image from Cloudinary
- `GET /api/upload/info/:publicId` - Get image info
- `GET /api/upload/transform` - Transform image URL

### System
- `GET /api/health` - Health check endpoint

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:
- Responsive grid layouts that adapt to different screen sizes
- Touch-friendly interactive elements
- Optimized typography scaling
- Flexible image handling

## 🚀 Performance Features

- **Code Splitting** - Route-based code splitting for optimal loading
- **Optimized Images** - Responsive image handling with proper sizing
- **Smooth Animations** - Hardware-accelerated animations with Framer Motion
- **Efficient Rendering** - React optimization and minimal re-renders

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for high-quality artwork images
- **Lucide** for beautiful, customizable icons
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for smooth animations and transitions

## 📞 Contact

For questions or support regarding this project, please open an issue in the repository or contact the development team.

---

*Built with ❤️ using modern web technologies to showcase the future of art restoration.*
