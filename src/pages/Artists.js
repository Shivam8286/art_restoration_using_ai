import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Twitter, Globe, Mail } from 'lucide-react';

const Artists = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);

  const artists = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Landscape & Nature",
      bio: "Sarah is a renowned landscape artist known for her breathtaking depictions of natural scenery. Her work captures the essence of untouched wilderness and the beauty of our natural world.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      location: "Colorado, USA",
      experience: "15+ years",
      artworks: 45,
      social: {
        instagram: "@sarahjohnson.art",
        twitter: "@sarahjohnson",
        website: "sarahjohnson.com"
      },
      featuredWorks: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop"
      ]
    },
    {
      id: 2,
      name: "Michael Chen",
      specialty: "Abstract & Contemporary",
      bio: "Michael's abstract works explore the boundaries between reality and imagination. His contemporary approach challenges traditional artistic conventions and invites viewers to interpret meaning in their own way.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      location: "New York, USA",
      experience: "12+ years",
      artworks: 38,
      social: {
        instagram: "@michaelchen.art",
        twitter: "@michaelchen",
        website: "michaelchen.com"
      },
      featuredWorks: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1549887534-1541e9326642?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop"
      ]
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      specialty: "Portrait & Figurative",
      bio: "Emma specializes in capturing the human spirit through her detailed portraits and figurative works. Her ability to convey emotion and personality has made her one of the most sought-after portrait artists.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      location: "Los Angeles, USA",
      experience: "18+ years",
      artworks: 52,
      social: {
        instagram: "@emmarodriguez.art",
        twitter: "@emmarodriguez",
        website: "emmarodriguez.com"
      },
      featuredWorks: [
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=150&fit=crop",
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=150&fit=crop"
      ]
    }
  ];

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
              Meet Our Artists
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Discover the talented artists behind our beautiful collection of artworks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card overflow-hidden cursor-pointer"
                onClick={() => setSelectedArtist(artist)}
              >
                <div className="relative">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-semibold">{artist.name}</h3>
                    <p className="text-sm opacity-90">{artist.specialty}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-sm text-secondary-600">
                      <p>{artist.location}</p>
                      <p>{artist.experience} experience</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold text-primary-600">{artist.artworks}</div>
                      <div className="text-xs text-secondary-500">Artworks</div>
                    </div>
                  </div>
                  
                  <p className="text-secondary-600 text-sm line-clamp-3 mb-4">
                    {artist.bio}
                  </p>
                  
                  <div className="flex space-x-3">
                    <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                      <Globe className="h-4 w-4" />
                    </a>
                    <a href="#" className="text-secondary-400 hover:text-primary-500 transition-colors">
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist Modal */}
      {selectedArtist && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedArtist(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={selectedArtist.image}
                    alt={selectedArtist.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="text-2xl font-display font-bold text-secondary-900">
                      {selectedArtist.name}
                    </h2>
                    <p className="text-primary-600">{selectedArtist.specialty}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-secondary-600 mb-6">{selectedArtist.bio}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Location:</span>
                      <span className="font-medium">{selectedArtist.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Experience:</span>
                      <span className="font-medium">{selectedArtist.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-secondary-600">Artworks:</span>
                      <span className="font-medium">{selectedArtist.artworks}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                      <Instagram className="h-4 w-4" />
                      <span className="text-sm">{selectedArtist.social.instagram}</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700">
                      <Globe className="h-4 w-4" />
                      <span className="text-sm">{selectedArtist.social.website}</span>
                    </a>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3">Featured Works</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {selectedArtist.featuredWorks.map((work, index) => (
                      <img
                        key={index}
                        src={work}
                        alt={`Featured work ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Artists;
