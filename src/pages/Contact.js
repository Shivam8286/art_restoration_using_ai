import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      details: "456 Restoration Lane, Tech District, San Francisco, CA 94105"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567"
    },
    {
      icon: Mail,
      title: "Email",
      details: "info@aiartrestoration.com"
    },
    {
      icon: Clock,
      title: "Hours",
      details: "Tue-Sat: 10AM-6PM, Sun: 12PM-5PM"
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
              Contact Us
            </h1>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Get in touch with us to discuss your restoration project, request a quote, or learn more about our AI technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <info.icon className="h-8 w-8 text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2">
                  {info.title}
                </h3>
                <p className="text-secondary-600">
                  {info.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-display font-bold text-secondary-900 mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-secondary-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-secondary-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary flex items-center justify-center ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                              <h3 className="text-2xl font-display font-bold text-secondary-900 mb-4">
                Visit Our Studio
              </h3>
              <div className="bg-secondary-200 rounded-lg p-6 mb-6">
                <p className="text-secondary-700 mb-4">
                  Located in the heart of San Francisco's Tech District, our studio is equipped with state-of-the-art AI processing facilities and traditional restoration tools.
                </p>
                <div className="space-y-2 text-sm text-secondary-600">
                  <p><strong>Parking:</strong> Street parking available, garage nearby</p>
                  <p><strong>Public Transport:</strong> BART and Muni lines (1 block away)</p>
                  <p><strong>Accessibility:</strong> Wheelchair accessible entrance</p>
                </div>
              </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-secondary-200 rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-secondary-400 mx-auto mb-2" />
                  <p className="text-secondary-600">Interactive Map</p>
                  <p className="text-sm text-secondary-500">456 Restoration Lane, SF 94105</p>
                </div>
              </div>

              {/* FAQ Section */}
              <div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-medium text-secondary-900">How long does restoration take?</h4>
                    <p className="text-sm text-secondary-600 mt-1">
                      Restoration time varies from 1-4 weeks depending on the extent of damage and complexity.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-medium text-secondary-900">What file formats do you accept?</h4>
                    <p className="text-sm text-secondary-600 mt-1">
                      We accept high-resolution images in JPG, PNG, TIFF formats. Higher resolution yields better results.
                    </p>
                  </div>
                  <div className="border-l-4 border-primary-500 pl-4">
                    <h4 className="font-medium text-secondary-900">Do you offer payment plans?</h4>
                    <p className="text-sm text-secondary-600 mt-1">
                      Yes, we offer flexible payment options for restoration projects over $500.
                    </p>
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

export default Contact;
