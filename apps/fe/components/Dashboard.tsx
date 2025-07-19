"use client"
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Plus,
  RefreshCcwIcon,
  Globe, 
  AlertCircle,
  CheckCircle,
  XCircle,
  ExternalLink,
  X
} from 'lucide-react';
import axios from 'axios';
import { formatDateTime } from '@/utils/dateTime';

interface Website {
  id:string;
  status:"Up" | "Down" | "Checking"
  url: string;
  responseTime: number;
  lastChecked: string;
}

interface DashboardProps{
    onSignOut : ()=> void
}

const getUserWebsitesUrl = "http://localhost:3001/api/v1/user/websites"
const addWebsiteUrl = "http://localhost:3001/api/v1/website/add"

export default function DashboardComponent({onSignOut}: DashboardProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    url: ''
  });
  const [websites, setWebsites] = useState<Website[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token")
        const response = await axios.get(getUserWebsitesUrl,{
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        setWebsites(response.data.websites.map( (w:any) =>({
          id:w.id,
          status:w.ticks[0] ? w.ticks[0].status== "Up" ? "Up" : "Down" : "Checking",
          url: w.url,
          responseTime: w.ticks[0] ?w.ticks[0].response_time_ms : 0,
          lastChecked: w.ticks[0] ?formatDateTime(w.ticks[0].created_at): "Not checked"
        })));
        setError(null);
      } catch (err) {
        console.error('Error fetching websites:', err);
        setError('Failed to fetch websites');
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
    const interval = setInterval(fetchWebsites, 30000);
  
    return () => clearInterval(interval);
  }, []);

  const handleAddWebsite = async(e: React.FormEvent) => {
    e.preventDefault();
    if (newWebsite.url) {
      try {
        const token = localStorage.getItem("token")
        const response = await axios.post(addWebsiteUrl, {
          url: newWebsite.url
        },{
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        });

        const newWebsiteData: Website = {
          id: response.data.id || Date.now().toString(), 
          status: "Checking", 
          url: response.data.url || newWebsite.url,
          responseTime: 0,
          lastChecked: "Not checked" 
        };

        setWebsites([...websites, newWebsiteData]);
        setNewWebsite({ url: '' });
        setShowAddModal(false);
      } catch (err) {
        console.error('Error adding website:', err);
        setError('Failed to add website');
      }
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Up':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Down':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'Checking':
        return <RefreshCcwIcon className="w-5 h-5 text-yellow-400 animate-spin" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";
    switch (status) {
      case 'Up':
        return `${baseClasses} bg-green-900/50 text-green-300 border border-green-500/30`;
      case 'Down':
        return `${baseClasses} bg-red-900/50 text-red-300 border border-red-500/30`;
      case 'Checking':
        return `${baseClasses} bg-yellow-900/50 text-yellow-300 border border-yellow-500/30`;
      default:
        return `${baseClasses} bg-gray-900/50 text-gray-300 border border-gray-500/30`;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                UpTime
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome back</span>
              <button onClick={onSignOut} className="text-gray-400 hover:text-white transition-colors">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-400">Monitor your websites and APIs in real-time</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center space-x-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            <span>Add Website</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-900/50 border border-red-500/50 rounded-xl p-4 flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-300">{error}</span>
            <button 
              onClick={() => setError(null)}
              className="ml-auto text-red-400 hover:text-red-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Websites Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-bold text-white">Monitored Websites</h2>
          </div>
          
           <div className="overflow-x-auto">
            <table className="w-full table-fixed">
              <thead className="bg-gray-700/50">
                <tr>
                  <th className="w-1/4 px-6 py-4 text-left text-sm font-medium text-gray-300">Website</th>
                  <th className="w-1/4 px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="w-1/4 px-6 py-4 text-left text-sm font-medium text-gray-300">Response Time</th>
                  <th className="w-1/4 px-6 py-4 text-left text-sm font-medium text-gray-300">Last Checked</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                        <span className="text-gray-400">Loading websites...</span>
                      </div>
                    </td>
                  </tr>
                ) : websites.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center space-y-2">
                        <Globe className="w-12 h-12 text-gray-600" />
                        <span className="text-gray-400">No websites added yet</span>
                        <span className="text-gray-500 text-sm">Click "Add Website" to get started</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  websites.map((website) => (
                    <tr key={website.id} className="hover:bg-gray-700/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm text-gray-400 flex items-center space-x-1">
                            <span className="truncate">{website.url}</span>
                            <ExternalLink className="w-3 h-3 flex-shrink-0" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(website.status)}
                          <span className={getStatusBadge(website.status)}>
                            {website.status ? website.status.charAt(0).toUpperCase() + website.status.slice(1) : 'Unknown'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white font-medium">
                          {website.status === 'down' ? '-' : `${website.responseTime}ms`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-gray-400">{website.lastChecked}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Website Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">Add New Website</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddWebsite} className="p-6 space-y-6">  
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newWebsite.url}
                  onChange={(e) => setNewWebsite({ ...newWebsite, url: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border border-gray-600 text-gray-300 rounded-xl hover:border-gray-500 hover:text-white transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 font-semibold"
                >
                  Add Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}