import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Target } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Preservation",
      description: "We are dedicated to preserving cultural heritage through advanced AI technology and traditional restoration expertise."
    },
    {
      icon: Users,
      title: "Innovation",
      description: "We combine cutting-edge machine learning with artistic knowledge to achieve unprecedented restoration results."
    },
    {
      icon: Target,
      title: "Accuracy",
      description: "Our AI algorithms are trained on thousands of historical artworks to ensure authentic restoration outcomes."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in digital restoration, delivering museum-quality results for every project."
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Leading our AI research team with 15+ years in computer vision and machine learning for cultural heritage preservation."
    },
    {
      name: "Michael Rodriguez",
      role: "Art Conservation Specialist",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Expert in traditional restoration techniques with deep knowledge of art history and conservation methods."
    },
    {
      name: "Dr. Emily Watson",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      bio: "Specializes in developing AI algorithms for art restoration and ensuring technical excellence in all projects."
    }
  ];

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-secondary-900 mb-6">
              About AI Art Restoration
            </h1>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              We're pioneers in using artificial intelligence to restore and preserve traditional artworks, combining cutting-edge technology with artistic expertise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-secondary-600 mb-6">
                Founded in 2020, we've been at the forefront of AI-powered art restoration, combining machine learning with traditional conservation expertise. Our mission is to preserve cultural heritage by restoring damaged artworks to their original glory using advanced technology.
              </p>
              <p className="text-lg text-secondary-600 mb-8">
                We've developed proprietary AI algorithms trained on thousands of historical artworks, enabling us to achieve restoration results that were previously impossible through traditional methods alone.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">200+</div>
                  <div className="text-secondary-600">Restorations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">95%</div>
                  <div className="text-secondary-600">Success Rate</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop"
                alt="Gallery Interior"
                className="rounded-2xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our relationships with artists and art lovers.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <value.icon className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-secondary-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-secondary-600 max-w-2xl mx-auto">
              Our interdisciplinary team combines AI expertise with traditional art conservation knowledge.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 mb-4">{member.role}</p>
                <p className="text-secondary-600">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
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
              Start Your Restoration Project
            </h2>
            <p className="text-xl text-secondary-300 mb-8 max-w-2xl mx-auto">
              Contact our team to discuss your restoration needs and see how AI technology can revive your damaged artwork.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary bg-primary-500 hover:bg-primary-600">
                Get a Quote
              </button>
              <button className="btn-secondary bg-secondary-700 hover:bg-secondary-600 text-white">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
