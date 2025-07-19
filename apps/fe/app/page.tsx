"use client"
import React from 'react';
import { 
  Shield, 
  Zap, 
  Bell, 
  BarChart3, 
  Globe, 
  Check, 
  ArrowRight,
  Monitor,
  Clock,
  Users,
  Star
} from 'lucide-react';
import { useRouter } from 'next/navigation';

function App() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Navigation */}
      <nav className="fixed w-full bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-800">
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
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <button onClick={()=>{
                router.push("/signup")
              }} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                Get Started
              </button>
              <button onClick={()=>{
                router.push("/signin")
              }} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5">
                Sign in
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border border-blue-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">99.9% Uptime Guaranteed</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Monitor Everything.
              </span>
              <br />
              <span className="text-white">Miss Nothing.</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant alerts when your websites, APIs, or services go down. 
              Monitor from multiple locations worldwide with detailed analytics and lightning-fast notifications.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2 text-lg font-semibold">
                <span>Start Monitoring Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center space-x-2 text-lg">
                <Monitor className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Dashboard Preview */}
            <div className="relative max-w-5xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-3xl opacity-60 -z-10"></div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-6 rounded-xl border border-green-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-green-300 font-semibold">All Systems</span>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-3xl font-bold text-green-200">100%</div>
                    <div className="text-green-400 text-sm">Uptime</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 p-6 rounded-xl border border-blue-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-blue-300 font-semibold">Response Time</span>
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-200">247ms</div>
                    <div className="text-blue-400 text-sm">Average</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-300 font-semibold">Incidents</span>
                      <Shield className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-purple-200">0</div>
                    <div className="text-purple-400 text-sm">This month</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center space-x-8 text-gray-400">
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Operational</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>15 Monitoring Locations</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Real-time Analytics</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything you need to stay
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> online</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive monitoring tools that keep your digital infrastructure running smoothly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Monitoring",
                description: "Monitor from 15+ locations worldwide to ensure your site is accessible everywhere",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Bell,
                title: "Instant Alerts",
                description: "Get notified immediately via email, SMS, Slack, or webhooks when issues occur",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: BarChart3,
                title: "Detailed Analytics",
                description: "Deep insights into performance metrics, response times, and uptime history",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Shield,
                title: "SSL Monitoring",
                description: "Track SSL certificate expiration and security status automatically",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: Zap,
                title: "API Monitoring",
                description: "Monitor REST APIs, GraphQL endpoints, and custom integrations",
                color: "from-cyan-500 to-blue-500"
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description: "Share status pages, manage team permissions, and collaborate on incidents",
                color: "from-violet-500 to-purple-500"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by thousands of businesses worldwide
            </h2>
            <p className="text-xl text-blue-100">
              Join companies that never miss a beat
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "99.99%", label: "Uptime SLA" },
              { number: "500M+", label: "Checks per month" },
              { number: "<30s", label: "Alert delivery" },
              { number: "15+", label: "Global locations" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-200 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-300">
              Start free, upgrade when you need more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                period: "forever",
                features: ["5 monitors", "1-minute intervals", "Email alerts", "Basic analytics"],
                popular: false
              },
              {
                name: "Professional",
                price: "$19",
                period: "per month",
                features: ["50 monitors", "30-second intervals", "SMS + Email alerts", "Advanced analytics", "API access", "Custom status pages"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "$99",
                period: "per month",
                features: ["Unlimited monitors", "10-second intervals", "All alert channels", "White-label status pages", "Priority support", "Custom integrations"],
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className={`relative bg-gray-700/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border-2 ${plan.popular ? 'border-blue-500 transform scale-105 bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'border-gray-600'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Most Popular</span>
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-300 ml-2">/{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:-translate-y-1' 
                    : 'border-2 border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">UpGuard</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                Keep your digital infrastructure running smoothly with our comprehensive monitoring solutions.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <Globe className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <Shield className="w-5 h-5" />
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition-colors">
                  <BarChart3 className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 UpGuard. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;