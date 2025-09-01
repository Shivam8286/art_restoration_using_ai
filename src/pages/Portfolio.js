import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Eye, Clock, Zap } from 'lucide-react';
import RestorationCard from '../components/RestorationCard';

const Portfolio = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const categories = ['all', 'renaissance', 'baroque', 'classical', 'romantic', 'modern'];
  const periods = [
    { value: 'all', label: 'All Periods' },
    { value: '1400-1600', label: 'Renaissance (1400-1600)' },
    { value: '1600-1750', label: 'Baroque (1600-1750)' },
    { value: '1750-1850', label: 'Classical (1750-1850)' },
    { value: '1850-1900', label: 'Romantic (1850-1900)' },
    { value: '1900+', label: 'Modern (1900+)' }
  ];

  const restorations = [
    {
      id: 1,
      title: "Renaissance Portrait Restoration",
      originalImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
      technique: "AI-Powered Color Restoration",
      duration: "2 weeks",
      category: "renaissance",
      period: "1500",
      description: "Restored faded colors and repaired minor surface damage"
    },
    {
      id: 2,
      title: "Baroque Landscape Recovery",
      originalImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      technique: "Damage Repair & Enhancement",
      duration: "3 weeks",
      category: "baroque",
      period: "1650",
      description: "Major tear repair and color restoration"
    },
    {
      id: 3,
      title: "Classical Still Life Revival",
      originalImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      technique: "Complete Digital Reconstruction",
      duration: "4 weeks",
      category: "classical",
      period: "1800",
      description: "Complete reconstruction of severely damaged artwork"
    },
    {
      id: 4,
      title: "Romantic Portrait Enhancement",
      originalImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      technique: "Color Enhancement",
      duration: "1 week",
      category: "romantic",
      period: "1850",
      description: "Enhanced colors and improved contrast"
    },
    {
      id: 5,
      title: "Modern Abstract Restoration",
      originalImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      technique: "Surface Reconstruction",
      duration: "2 weeks",
      category: "modern",
      period: "1950",
      description: "Surface damage repair and texture restoration"
    },
    {
      id: 6,
      title: "Renaissance Fresco Recovery",
      originalImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop",
      restoredImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      technique: "Complete Reconstruction",
      duration: "5 weeks",
      category: "renaissance",
      period: "1550",
      description: "Complete digital reconstruction of damaged fresco"
    }
  ];

  const filteredRestorations = restorations.filter(restoration => {
    const categoryMatch = selectedCategory === 'all' || restoration.category === selectedCategory;
    const periodMatch = selectedPeriod === 'all' || 
      (selectedPeriod === '1400-1600' && restoration.period >= 1400 && restoration.period < 1600) ||
      (selectedPeriod === '1600-1750' && restoration.period >= 1600 && restoration.period < 1750) ||
      (selectedPeriod === '1750-1850' && restoration.period >= 1750 && restoration.period < 1850) ||
      (selectedPeriod === '1850-1900' && restoration.period >= 1850 && restoration.period < 1900) ||
      (selectedPeriod === '1900+' && restoration.period >= 1900);
    
    return categoryMatch && periodMatch;
  });

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Header */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-4">
              Restoration Portfolio
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore our collection of AI-powered restoration projects showcasing the transformation of damaged artworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-secondary-500" />
                <span className="text-sm font-medium text-secondary-700">Filters:</span>
              </div>
              
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* Period Filter */}
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {periods.map(period => (
                  <option key={period.value} value={period.value}>
                    {period.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 bg-secondary-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-secondary-200'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Restorations Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRestorations.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-secondary-600">No restorations found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredRestorations.map((restoration, index) => (
                <motion.div
                  key={restoration.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <RestorationCard restoration={restoration} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Restoration Statistics
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our AI technology has successfully restored hundreds of artworks across different periods and styles.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">200+</div>
              <div className="text-secondary-600">Artworks Restored</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
              <div className="text-secondary-600">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">15+</div>
              <div className="text-secondary-600">Art Periods</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">2-4</div>
              <div className="text-secondary-600">Weeks Average</div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
