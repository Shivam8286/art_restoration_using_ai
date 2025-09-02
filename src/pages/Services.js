import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Clock, Palette, Layers, Sparkles } from 'lucide-react';
import { useState } from 'react';

const Services = () => {
  const services = [
    {
      icon: Palette,
      title: "Color Restoration",
      description: "AI-powered color correction and restoration of faded or damaged pigments using advanced machine learning algorithms.",
      features: ["Historical accuracy", "Color matching", "Fade reversal", "Texture preservation"],
      duration: "1-2 weeks"
    },
    {
      icon: Layers,
      title: "Damage Repair",
      description: "Repair tears, scratches, and physical damage using AI-generated content that seamlessly integrates with the original artwork.",
      features: ["Tear repair", "Scratch removal", "Surface reconstruction", "Edge restoration"],
      duration: "2-3 weeks"
    },
    {
      icon: Sparkles,
      title: "Complete Reconstruction",
      description: "Full digital reconstruction of severely damaged artworks using AI analysis of similar pieces and historical data.",
      features: ["Missing parts reconstruction", "Style analysis", "Historical research", "Complete restoration"],
      duration: "3-4 weeks"
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

  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadSuccess(null);
    setUploadError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadError('Please select an image to upload.');
      return;
    }
    setUploading(true);
    setUploadSuccess(null);
    setUploadError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', title);
      formData.append('description', description);
      const res = await fetch('/api/restorations/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setUploadSuccess('Image uploaded and restoration created successfully!');
        setFile(null);
        setTitle('');
        setDescription('');
      } else {
        setUploadError(data.message || 'Upload failed.');
      }
    } catch (err) {
      setUploadError('Upload failed.');
    }
    setUploading(false);
  };

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
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary-500" />
                    <span className="text-sm text-secondary-600">{service.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Damaged Artwork Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Active Projects (placeholder for now) */}
          <div className="bg-secondary-50 rounded-2xl shadow p-8 flex flex-col items-center justify-center">
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">Active Projects</h3>
            <p className="text-secondary-600 mb-6">Continue working on your current restorations</p>
            <div className="flex flex-col items-center justify-center flex-1">
              <div className="mb-4">
                <svg width="48" height="48" fill="none" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8s8 3.59 8 8c0 4.41-3.59 8-8 8z" fill="#cbd5e1"/><path d="M12 6a6 6 0 100 12 6 6 0 000-12z" fill="#e5e7eb"/></svg>
              </div>
              <p className="text-secondary-500 text-center">No active projects<br/>Upload your first artwork to get started</p>
            </div>
          </div>
          {/* Start New Project */}
          <div className="bg-white rounded-2xl shadow p-8 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-secondary-900 mb-2">Start New Project</h3>
            <p className="text-secondary-600 mb-6">Upload damaged folk art for AI-powered restoration</p>
            <form className="w-full flex flex-col items-center" onSubmit={handleUpload}>
              <input
                type="text"
                placeholder="Artwork Title (optional)"
                className="mb-2 w-full px-4 py-2 border border-secondary-200 rounded-lg"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description (optional)"
                className="mb-2 w-full px-4 py-2 border border-secondary-200 rounded-lg"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
              <label htmlFor="file-upload" className="w-full cursor-pointer border-2 border-dashed border-primary-200 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-primary-50 transition mb-4">
                <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4" stroke="#e879f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#e879f9" strokeWidth="2"/></svg>
                <span className="mt-2 text-secondary-700 font-medium">Drag & Drop Your Artwork</span>
                <span className="text-xs text-secondary-400 mt-1">Support for JPG, PNG, TIFF up to 50MB</span>
                <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                {file && <span className="mt-2 text-primary-600 text-sm">Selected: {file.name}</span>}
              </label>
              <button type="submit" className="btn-primary w-full" disabled={uploading}>{uploading ? 'Uploading...' : '+ Upload & Restore'}</button>
              {uploadSuccess && <div className="mt-2 text-green-600">{uploadSuccess}</div>}
              {uploadError && <div className="mt-2 text-red-600">{uploadError}</div>}
            </form>
            <div className="mt-6 w-full">
              <div className="bg-secondary-50 rounded-xl p-4">
                <h4 className="text-md font-semibold text-secondary-900 mb-2">AI Assessment Features</h4>
                <ul className="grid grid-cols-2 gap-2 text-sm text-secondary-700">
                  <li>🔍 Damage Detection</li>
                  <li>📝 Restoration Tips</li>
                  <li>🧠 Condition Assessment</li>
                  <li>🎨 Color Analysis</li>
                </ul>
              </div>
            </div>
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
