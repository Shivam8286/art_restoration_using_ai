import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Clock, Zap } from 'lucide-react';

const RestorationCard = ({ restoration }) => {
  const [showRestored, setShowRestored] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="card overflow-hidden group"
    >
      <div className="relative overflow-hidden">
        <div className="relative h-64">
          <img
            src={showRestored ? restoration.restoredImage : restoration.originalImage}
            alt={restoration.title}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
            <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button 
                onClick={() => setShowRestored(!showRestored)}
                className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {showRestored ? 'Before' : 'After'}
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
      </div>
      
      <div className="p-6">
        <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors mb-3">
          {restoration.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex items-center space-x-1">
            <Zap className="h-4 w-4 text-primary-500" />
            <span className="text-sm text-secondary-600">{restoration.technique}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-primary-500" />
            <span className="text-sm text-secondary-600">{restoration.duration}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="inline-block bg-primary-100 text-primary-700 text-xs px-2 py-1 rounded-full">
            AI Restoration
          </span>
          <div className="text-xs text-secondary-500">
            {showRestored ? 'Restored' : 'Original'}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RestorationCard;
