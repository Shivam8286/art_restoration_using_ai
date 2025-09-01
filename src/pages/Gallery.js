import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import ArtworkCard from '../components/ArtworkCard';

const Gallery = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');

  const categories = ['all', 'landscape', 'abstract', 'portrait', 'contemporary', 'classical'];
  const priceRanges = [
    { value: 'all', label: 'All Prices' },
    { value: '0-1000', label: 'Under $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000+', label: 'Over $5,000' }
  ];

  const artworks = [
    {
      id: 1,
      title: "Sunset Over Mountains",
      artist: "Sarah Johnson",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      price: "$2,500",
      category: "landscape"
    },
    {
      id: 2,
      title: "Abstract Harmony",
      artist: "Michael Chen",
      image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
      price: "$1,800",
      category: "abstract"
    },
    {
      id: 3,
      title: "Urban Dreams",
      artist: "Emma Rodriguez",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      price: "$3,200",
      category: "contemporary"
    },
    {
      id: 4,
      title: "Classical Portrait",
      artist: "David Wilson",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=300&fit=crop",
      price: "$4,500",
      category: "portrait"
    },
    {
      id: 5,
      title: "Ocean Waves",
      artist: "Lisa Park",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
      price: "$1,200",
      category: "landscape"
    },
    {
      id: 6,
      title: "Modern Abstract",
      artist: "James Brown",
      image: "https://images.unsplash.com/photo-1549887534-1541e9326642?w=400&h=300&fit=crop",
      price: "$6,800",
      category: "abstract"
    }
  ];

  const filteredArtworks = artworks.filter(artwork => {
    const categoryMatch = selectedCategory === 'all' || artwork.category === selectedCategory;
    const priceMatch = selectedPrice === 'all' || 
      (selectedPrice === '0-1000' && parseInt(artwork.price.replace(/[^0-9]/g, '')) < 1000) ||
      (selectedPrice === '1000-5000' && parseInt(artwork.price.replace(/[^0-9]/g, '')) >= 1000 && parseInt(artwork.price.replace(/[^0-9]/g, '')) <= 5000) ||
      (selectedPrice === '5000+' && parseInt(artwork.price.replace(/[^0-9]/g, '')) > 5000);
    
    return categoryMatch && priceMatch;
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
              Art Gallery
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Explore our diverse collection of artworks from talented artists around the world.
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

              {/* Price Filter */}
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="px-3 py-2 border border-secondary-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {priceRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
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

      {/* Artworks Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArtworks.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-lg text-secondary-600">No artworks found matching your criteria.</p>
            </motion.div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ArtworkCard artwork={artwork} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Gallery;
