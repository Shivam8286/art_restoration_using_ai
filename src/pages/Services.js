import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Palette, Layers, Sparkles } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Color Restoration",
      description: "AI-powered color correction and restoration of faded or damaged pigments using advanced machine learning algorithms.",
      features: ["Historical accuracy", "Color matching", "Fade reversal", "Texture preservation"],
      duration: "1-2 weeks",
      price: "From $500"
    },
    {
      icon: Layers,
      title: "Damage Repair",
      description: "Repair tears, scratches, and physical damage using AI-generated content that seamlessly integrates with the original artwork.",
      features: ["Tear repair", "Scratch removal", "Surface reconstruction", "Edge restoration"],
      duration: "2-3 weeks",
      price: "From $800"
    },
    {
      icon: Sparkles,
      title: "Complete Reconstruction",
      description: "Full digital reconstruction of severely damaged artworks using AI analysis of similar pieces and historical data.",
      features: ["Missing parts reconstruction", "Style analysis", "Historical research", "Complete restoration"],
      duration: "3-4 weeks",
      price: "From $1,200"
    }
  ];

  const process = [
    {
      step: "01",
      title: "Assessment",
      description: "Digital analysis of damage extent and restoration requirements using AI diagnostics."
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Machine learning algorithms analyze the artwork and generate restoration strategies."
    },
    {
      step: "03",
      title: "Restoration",
      description: "AI-powered restoration process with continuous quality monitoring and adjustments."
    },
    {
      step: "04",
      title: "Delivery",
      description: "High-resolution digital restoration delivered with detailed documentation and comparison."
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
              AI Restoration Services
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Professional restoration services powered by cutting-edge artificial intelligence technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-8"
              >
                <div className="flex justify-center mb-6">
                  <service.icon className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-secondary-600 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-sm text-secondary-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-primary-500" />
                      <span className="text-sm text-secondary-600">{service.duration}</span>
                    </div>
                    <div className="text-lg font-semibold text-primary-600">
                      {service.price}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Our Restoration Process
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              A systematic approach combining AI technology with artistic expertise for optimal results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-secondary-600">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-6">
                Advanced AI Technology
              </h2>
              <p className="text-lg text-secondary-600 mb-6">
                Our restoration process utilizes state-of-the-art machine learning algorithms specifically trained on thousands of historical artworks.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-primary-500" />
                  <span className="text-secondary-700">Deep Learning Neural Networks</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary-500" />
                  <span className="text-secondary-700">Historical Accuracy Preservation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-primary-500" />
                  <span className="text-secondary-700">Real-time Processing</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Technology Stack
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Computer Vision</span>
                    <span className="text-primary-600 font-medium">95%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Style Transfer</span>
                    <span className="text-primary-600 font-medium">92%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-secondary-600">Color Accuracy</span>
                    <span className="text-primary-600 font-medium">98%</span>
                  </div>
                  <div className="w-full bg-secondary-200 rounded-full h-2">
                    <div className="bg-primary-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
