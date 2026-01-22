import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess('Password reset email sent! Please check your inbox and follow the instructions.');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
      console.error('Password reset error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen nature-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-40 h-32 bg-white/20 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-20 left-20 w-32 h-24 bg-white/15 rounded-full blur-md animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-6">
        <Link to="/login" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <span className="mr-2">←</span>
          Back to Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">🔑</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
            <p className="text-gray-600">Enter your email to receive a password reset link</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Reset Form */}
          <div className="glass-card p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full healing-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            {/* Back to Login */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Remember your password?{' '}
                <Link to="/login" className="text-healing-600 hover:text-healing-700 font-medium transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 italic">
              "Breathe. You're not alone." 🌸
            </p>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full flex items-center justify-center floating-element">
        <span className="text-2xl">💭</span>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;


