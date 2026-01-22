import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const { refreshUserProfile, currentUser } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/chatbot', { replace: true });
    }
  }, [currentUser, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
    setSuccess(''); // Clear success when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        setError('Please verify your email before signing in. Check your inbox for the verification link.');
        await signOut(auth);
        setLoading(false);
        return;
      }

      // Update last login in Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date()
        }, { merge: true });
      }

      // Refresh user profile
      await refreshUserProfile();

      // Show success message
      setSuccess('✅ Login successful! Redirecting to chatbot...');
      
      // Wait for auth state to update via onAuthStateChanged, then navigate
      // The useEffect will handle the redirect when currentUser is set
      // But we also navigate here as a backup after a short delay
      setTimeout(() => {
        if (auth.currentUser) {
          navigate('/chatbot', { replace: true });
        }
      }, 800);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-disabled') {
        setError('This account has been disabled. Please contact support.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Too many failed login attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleSigningIn(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      
      // Extract first and last name from Google display name
      const displayName = userCredential.user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Check if user document exists, if not create it
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      if (!userDoc.exists()) {
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          firstName: firstName,
          lastName: lastName,
          email: userCredential.user.email,
          emailVerified: userCredential.user.emailVerified,
          createdAt: new Date(),
          lastLogin: new Date(),
          googleSignIn: true
        });
      } else {
        // Update last login
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          lastLogin: new Date()
        }, { merge: true });
      }

      // Refresh user profile
      await refreshUserProfile();

      // Show success message
      setSuccess('✅ Login successful! Redirecting to chatbot...');
      
      // Wait for auth state to update via onAuthStateChanged, then navigate
      // The useEffect will handle the redirect when currentUser is set
      // But we also navigate here as a backup after a short delay
      setTimeout(() => {
        if (auth.currentUser) {
          navigate('/chatbot', { replace: true });
        }
      }, 800);
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        setError('Google sign-in was cancelled. Please try again.');
      } else if (error.code === 'auth/popup-blocked') {
        setError('Pop-up was blocked. Please allow pop-ups and try again.');
      } else if (error.code === 'auth/account-exists-with-different-credential') {
        setError('An account already exists with this email using a different sign-in method.');
      } else {
        setError('Google sign-in failed. Please try again.');
      }
    } finally {
      setGoogleSigningIn(false);
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
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <span className="mr-2">←</span>
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">🌿</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Continue your healing journey</p>
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-lg">✅</span>
                <span className="font-semibold">{success}</span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <div className="glass-card p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-healing-600 focus:ring-healing-400" />
                  <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-sm text-healing-600 hover:text-healing-700 transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full healing-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Login */}
            <button 
              onClick={handleGoogleSignIn}
              disabled={googleSigningIn || loading}
              className="w-full bg-white/80 hover:bg-white text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg mb-4 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {googleSigningIn ? (
                <>
                  <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                  <span>Connecting with Google...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🔐</span>
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/signup" className="text-healing-600 hover:text-healing-700 font-medium transition-colors">
                  Sign up here
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

export default LoginPage;
