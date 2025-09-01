import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Eye } from 'lucide-react';

const ArtworkCard = ({ artwork }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <img
          src={artwork.image}
          alt={artwork.title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              <Heart className="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              <Eye className="h-4 w-4 inline mr-1" />
              View Details
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
            {artwork.title}
          </h3>
          <span className="text-sm text-primary-600 font-medium">
            {artwork.price}
          </span>
        </div>
        
        <p className="text-secondary-600 mb-3">
          by {artwork.artist}
        </p>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-secondary-100 text-secondary-700 text-xs px-2 py-1 rounded-full">
            {artwork.category}
          </span>
          <div className="text-xs text-secondary-500">
            Available
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtworkCard;
