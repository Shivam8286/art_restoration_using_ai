import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List, Eye, Clock, Zap } from 'lucide-react';
import RestorationCard from '../components/RestorationCard';

const Portfolio = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const categories = ['all', 'warli', 'madhubani', 'kalighat', 'kangra', 'gond'];
  const periods = [
    { value: 'all', label: 'All Styles' },
    { value: 'warli', label: 'Warli' },
    { value: 'madhubani', label: 'Madhubani' },
    { value: 'kalighat', label: 'Kalighat' },
    { value: 'kangra', label: 'Kangra' },
    { value: 'gond', label: 'Gond' }
  ];

  const restorations = [
    {
      id: 1,
      title: "Warli Art Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Warli_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Warli_painting.jpg",
      technique: "Traditional Warli Techniques",
      duration: "2 weeks",
      category: "warli",
      period: "warli",
      description: "Restored traditional Warli painting using natural pigments and digital enhancement."
    },
    {
      id: 2,
      title: "Madhubani Art Revival",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Madhubani_art.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Madhubani_art.jpg",
      technique: "Natural Dyes & AI Enhancement",
      duration: "3 weeks",
      category: "madhubani",
      period: "madhubani",
      description: "Revived faded Madhubani artwork with color correction and pattern restoration."
    },
    {
      id: 3,
      title: "Kalighat Painting Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kalighat_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kalighat_painting.jpg",
      technique: "Digital & Manual Touch-up",
      duration: "4 weeks",
      category: "kalighat",
      period: "kalighat",
      description: "Restored Kalighat painting with digital retouching and manual detailing."
    },
    {
      id: 4,
      title: "Kangra Miniature Revival",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kangra_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kangra_painting.jpg",
      technique: "Miniature Detailing",
      duration: "3 weeks",
      category: "kangra",
      period: "kangra",
      description: "Revived intricate Kangra miniature painting with fine brushwork."
    },
    {
      id: 5,
      title: "Gond Art Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gond_art.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gond_art.jpg",
      technique: "Pattern & Color Restoration",
      duration: "2 weeks",
      category: "gond",
      period: "gond",
      description: "Restored vibrant colors and patterns in Gond art using digital and traditional methods."
    }
  ];

  const filteredRestorations = restorations.filter(restoration => {
    const categoryMatch = selectedCategory === 'all' || restoration.category === selectedCategory;
    const periodMatch = selectedPeriod === 'all' || restoration.period === selectedPeriod;
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
