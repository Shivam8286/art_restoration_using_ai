import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, API_BASE_URL } = useAuth();
  const [restorations, setRestorations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    completed: 0
  });

  useEffect(() => {
    fetchRestorations();
  }, []);

  const fetchRestorations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/restorations`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setRestorations(data.restorations || []);
        
        // Calculate stats
        const total = data.restorations?.length || 0;
        const pending = data.restorations?.filter(r => r.status === 'pending').length || 0;
        const inProgress = data.restorations?.filter(r => r.status === 'in-progress').length || 0;
        const completed = data.restorations?.filter(r => r.status === 'completed').length || 0;
        
        setStats({ total, pending, inProgress, completed });
      }
    } catch (error) {
      console.error('Failed to fetch restorations:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in-progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'review':
        return <Eye className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header & Notifications */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-display font-bold text-secondary-900 mb-2">Dashboard</h1>
              <p className="text-secondary-600 text-lg">Welcome back, {user?.name}! Here’s an overview of your restoration projects.</p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <span className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white px-3 py-1 rounded-full text-xs font-semibold">New</span>
              <span className="text-secondary-700 text-sm">AI-powered restoration now supports folk art styles!</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-lg shadow">
                  <Palette className="h-6 w-6 text-pink-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-pink-700">Total Projects</p>
                  <p className="text-2xl font-bold text-pink-900">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-lg shadow">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-yellow-700">Pending</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-lg shadow">
                  <AlertCircle className="h-6 w-6 text-blue-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-700">In Progress</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.inProgress}</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl shadow-lg p-6">
              <div className="flex items-center">
                <div className="p-3 bg-white rounded-lg shadow">
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-700">Completed</p>
                  <p className="text-2xl font-bold text-green-900">{stats.completed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Start New Project Upload Area */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">Start New Project</h3>
              <p className="text-secondary-600 mb-6">Upload damaged folk art for AI-powered restoration</p>
              <form className="w-full flex flex-col items-center">
                <label htmlFor="file-upload" className="w-full cursor-pointer border-2 border-dashed border-primary-200 rounded-xl p-8 flex flex-col items-center justify-center hover:bg-primary-50 transition mb-4">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path d="M12 16v-8m0 0l-4 4m4-4l4 4" stroke="#e879f9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="18" rx="4" stroke="#e879f9" strokeWidth="2"/></svg>
                  <span className="mt-2 text-secondary-700 font-medium">Drag & Drop Your Artwork</span>
                  <span className="text-xs text-secondary-400 mt-1">Support for JPG, PNG, TIFF up to 50MB</span>
                  <input id="file-upload" type="file" accept="image/*" className="hidden" />
                </label>
                <button type="submit" className="btn-primary w-full" disabled title="Demo only. Backend integration required.">+ Choose Files</button>
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
            {/* Activity Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-secondary-900 mb-4">Recent Activity</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <span className="inline-block bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-full p-2"><Palette className="h-5 w-5" /></span>
                  <div>
                    <p className="font-medium text-secondary-900">Folk Art Restoration Launched</p>
                    <p className="text-secondary-500 text-sm">You can now restore Warli, Madhubani, Kalighat, Kangra, and Gond artworks using AI.</p>
                    <span className="text-xs text-secondary-400">Just now</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-block bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-full p-2"><CheckCircle className="h-5 w-5" /></span>
                  <div>
                    <p className="font-medium text-secondary-900">Project Completed</p>
                    <p className="text-secondary-500 text-sm">Your Kangra Miniature restoration was completed successfully.</p>
                    <span className="text-xs text-secondary-400">2 days ago</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="inline-block bg-gradient-to-r from-yellow-400 to-pink-400 text-white rounded-full p-2"><AlertCircle className="h-5 w-5" /></span>
                  <div>
                    <p className="font-medium text-secondary-900">New Project Started</p>
                    <p className="text-secondary-500 text-sm">You started a new Madhubani Art restoration project.</p>
                    <span className="text-xs text-secondary-400">3 days ago</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Restorations List */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-secondary-900">Your Restoration Projects</h3>
            </div>

            {restorations.length === 0 ? (
              <div className="text-center py-12">
                <Palette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                <p className="text-gray-600 mb-6">Start your first restoration project to see it here.</p>
                <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Progress
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {restorations.map((restoration) => (
                      <tr key={restoration._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-12 w-12">
                              {restoration.originalImage?.url ? (
                                <img
                                  className="h-12 w-12 rounded-lg object-cover"
                                  src={restoration.originalImage.url}
                                  alt={restoration.title}
                                />
                              ) : (
                                <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Palette className="h-6 w-6 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {restoration.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {restoration.technique}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(restoration.status)}`}>
                            {getStatusIcon(restoration.status)}
                            <span className="ml-1 capitalize">{restoration.status.replace('-', ' ')}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${restoration.progress || 0}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-900">{restoration.progress || 0}%</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {restoration.estimatedDuration} weeks
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button className="text-primary-600 hover:text-primary-900 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900 transition-colors">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900 transition-colors">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
