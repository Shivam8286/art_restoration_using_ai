import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Users, Award, Zap, Shield, Clock } from 'lucide-react';
import RestorationCard from '../components/RestorationCard';

const Home = () => {
  const featuredRestorations = [
    {
      id: 1,
      title: "Warli Art Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Warli_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Warli_painting.jpg",
      technique: "Traditional Warli Techniques",
      duration: "2 weeks"
    },
    {
      id: 2,
      title: "Madhubani Art Revival",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Madhubani_art.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Madhubani_art.jpg",
      technique: "Natural Dyes & AI Enhancement",
      duration: "3 weeks"
    },
    {
      id: 3,
      title: "Kalighat Painting Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kalighat_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Kalighat_painting.jpg",
      technique: "Digital & Manual Touch-up",
      duration: "4 weeks"
    },
    {
      id: 4,
      title: "Kangra Miniature Revival",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kangra_painting.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Kangra_painting.jpg",
      technique: "Miniature Detailing",
      duration: "3 weeks"
    },
    {
      id: 5,
      title: "Gond Art Restoration",
      originalImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gond_art.jpg",
      restoredImage: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Gond_art.jpg",
      technique: "Pattern & Color Restoration",
      duration: "2 weeks"
    }
  ];

  const stats = [
    { icon: Star, value: "200+", label: "Restorations" },
    { icon: Zap, value: "95%", label: "Success Rate" },
    { icon: Clock, value: "2-4", label: "Weeks Avg" }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="gradient-bg relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold text-secondary-900 mb-6">
                Revive <span className="text-gradient">Masterpieces</span> with AI
              </h1>
              <p className="text-xl text-secondary-600 mb-8">
                Restore damaged traditional artworks to their original glory using 
                cutting-edge artificial intelligence and machine learning technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/services" className="btn-primary inline-flex items-center">
                  Our Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link to="/portfolio" className="btn-secondary">
                  View Portfolio
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                  alt="AI Restoration Process"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 rounded-full opacity-20"></div>
              <div className="absolute -bottom-4 -left-4 w-48 h-48 bg-primary-300 rounded-full opacity-20"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-12 w-12 text-primary-500" />
                </div>
                <div className="text-3xl font-bold text-secondary-900 mb-2">{stat.value}</div>
                <div className="text-secondary-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Featured Restorations
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              See the incredible transformation of damaged artworks through our AI-powered restoration process.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestorations.map((restoration, index) => (
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
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link to="/portfolio" className="btn-primary">
              View All Restorations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Ready to Restore Your Masterpiece?
            </h2>
            <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
              Join hundreds of art collectors who have revived their damaged treasures with our AI technology.
            </p>
            <Link to="/contact" className="btn-primary bg-primary-500 hover:bg-primary-600">
              Get in Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
