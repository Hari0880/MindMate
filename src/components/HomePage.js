import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen nature-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Floating clouds */}
        <div className="absolute top-20 left-20 w-32 h-20 bg-white/30 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-20 right-32 w-24 h-16 bg-white/20 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 left-1/3 w-20 h-12 bg-white/25 rounded-full blur-sm animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Abstract wave shapes */}
        <div className="absolute bottom-0 left-0 w-96 h-64 bg-gradient-to-r from-healing-200/30 to-nature-200/30 rounded-t-full transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-80 h-48 bg-gradient-to-l from-lavender-200/30 to-peach-200/30 rounded-t-full transform translate-x-1/2 translate-y-1/2"></div>
      </div>

      {/* Header with Auth Status */}
      <div className="relative z-10 p-6">
        <div className="flex justify-end">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, {currentUser.email}</span>
              <Link to="/chatbot" className="healing-button">
                Continue Chatting
              </Link>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signup" className="text-gray-600 hover:text-gray-800 transition-colors">
                Sign Up
              </Link>
              <Link to="/login" className="healing-button">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-3xl">🌿</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            <span className="text-healing-600">Healing</span> Together
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Your safe space for emotional support and mental wellness. 
            Connect with our compassionate AI companion anytime, anywhere.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {currentUser ? (
              <Link to="/chatbot" className="healing-button">
                Start Chatting
              </Link>
            ) : (
              <>
                <Link to="/login" className="healing-button">
                  Get Started
                </Link>
                <Link to="/signup" className="bg-white/80 hover:bg-white text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="glass-card p-6 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-healing-100 to-nature-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">24/7 Support</h3>
            <p className="text-gray-600">Always here when you need someone to talk to</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lavender-100 to-peach-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Safe & Private</h3>
            <p className="text-gray-600">Your conversations are completely confidential</p>
          </div>
          
          <div className="glass-card p-6 rounded-2xl text-center hover:transform hover:scale-105 transition-all duration-300">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-nature-100 to-healing-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Growth</h3>
            <p className="text-gray-600">Tools and insights for your mental wellness journey</p>
          </div>
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <p className="text-lg text-gray-600 italic">
            "Breathe. You're not alone." 🌸
          </p>
        </div>
      </div>

      {/* Floating meditation illustration */}
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-lavender-200/40 to-peach-200/40 rounded-full flex items-center justify-center floating-element">
        <span className="text-4xl">🧘‍♀️</span>
      </div>
    </div>
  );
};

export default HomePage;
