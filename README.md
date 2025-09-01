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

### Styling & UI
- **Tailwind CSS 3.3.5** - Utility-first CSS framework
- **PostCSS 8.4.24** - CSS processing and optimization
- **Autoprefixer 10.4.14** - Automatic vendor prefixing
- **Custom Design System** - Tailored color palette and typography

### Development Tools
- **Create React App** - Modern React development environment
- **ESLint** - Code quality and consistency
- **Jest & Testing Library** - Unit testing framework

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

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

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (irreversible)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ArtworkCard.js   # Individual artwork display cards
│   ├── Footer.js        # Site footer component
│   ├── Navbar.js        # Navigation header
│   └── RestorationCard.js # Before/after restoration cards
├── pages/               # Main application pages
│   ├── About.js         # Company/about information
│   ├── Artists.js       # Artist profiles and information
│   ├── Contact.js       # Contact form and information
│   ├── Gallery.js       # Artwork gallery display
│   ├── Home.js          # Landing page with hero section
│   ├── Portfolio.js     # Portfolio showcase
│   └── Services.js      # Service offerings and pricing
├── App.js               # Main application component
├── index.js             # Application entry point
└── index.css            # Global styles and Tailwind imports
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
