import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
  // const { } = useAuth(); // Removed unused destructuring
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('Creating your account...');

    try {
      // Create user with email and password
      setSuccess('Creating account...');
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );

      // Send email verification
      setSuccess('Sending verification email...');
      await sendEmailVerification(userCredential.user);

      // Store additional user data in Firestore
      setSuccess('Setting up your profile...');
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        emailVerified: false,
        createdAt: new Date(),
        lastLogin: new Date()
      });

      // Set success state and show email verification message
      setUserEmail(formData.email);
      setEmailSent(true);
      setSuccess('✅ Account created successfully!');
      
      // Clear form data
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false
      });

    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else if (error.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address');
      } else {
        setError('Failed to create account. Please try again.');
      }
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleSigningIn(true);
    setError('');
    setSuccess('Connecting with Google...');

    try {
      const provider = new GoogleAuthProvider();
      setSuccess('Opening Google sign-in...');
      const userCredential = await signInWithPopup(auth, provider);
      
      setSuccess('Setting up your profile...');
      
      // Extract first and last name from Google display name
      const displayName = userCredential.user.displayName || '';
      const nameParts = displayName.split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      // Store user data in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: userCredential.user.email,
        emailVerified: userCredential.user.emailVerified,
        createdAt: new Date(),
        lastLogin: new Date(),
        googleSignIn: true
      }, { merge: true });

      setSuccess('✅ Welcome! Redirecting to chatbot...');
      
      // Redirect to chatbot after Google sign-in (faster)
      setTimeout(() => {
        navigate('/chatbot');
      }, 1500);

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
      console.error('Google sign-in error:', error);
    } finally {
      setGoogleSigningIn(false);
    }
  };

  const handleResendEmail = async () => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        await sendEmailVerification(currentUser);
        setSuccess('Verification email sent again! Please check your inbox.');
      }
    } catch (error) {
      setError('Failed to resend verification email. Please try again.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  // Show email verification success screen
  if (emailSent) {
    return (
      <div className="min-h-screen nature-gradient relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-36 h-28 bg-white/20 rounded-full blur-md animate-float"></div>
          <div className="absolute bottom-20 right-20 w-28 h-20 bg-white/15 rounded-full blur-md animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Navigation */}
        <div className="relative z-10 p-6">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
            <span className="mr-2">←</span>
            Back to Home
          </Link>
        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg">
            {/* Success Message */}
            <div className="glass-card p-8 rounded-2xl shadow-xl text-center">
              <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">✅</span>
              </div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Account Created Successfully! 🎉</h1>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  We've sent a verification email to:
                </p>
                <p className="text-lg font-semibold text-healing-600 bg-healing-50 p-3 rounded-lg break-all">
                  {userEmail}
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-green-800 mb-3 flex items-center">
                    <span className="text-2xl mr-2">✅</span>
                    Account Created!
                  </h3>
                  <p className="text-sm text-green-700 mb-3">
                    Your account has been created successfully. Please verify your email to continue.
                  </p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-blue-800 mb-2">📧 Next Steps:</h3>
                  <ol className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start">
                      <span className="font-bold mr-2">1.</span>
                      <span>Check your email inbox (and spam folder) for the verification link</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">2.</span>
                      <span>Click the verification link in the email</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold mr-2">3.</span>
                      <span>Once verified, click the button below to go to login page</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoToLogin}
                  className="w-full healing-button text-lg py-4 font-semibold"
                >
                  🚀 Go to Login Page
                </button>
                
                <button
                  onClick={handleResendEmail}
                  className="w-full bg-white/80 hover:bg-white text-gray-700 font-medium py-3 px-6 rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg"
                >
                  📬 Resend Verification Email
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                <p>Didn't receive the email? Check your spam folder or</p>
                <button 
                  onClick={handleResendEmail}
                  className="text-healing-600 hover:text-healing-700 underline"
                >
                  click here to resend
                </button>
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
        <div className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full flex items-center justify-center floating-element">
          <span className="text-2xl">✨</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen nature-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-36 h-28 bg-white/20 rounded-full blur-md animate-float"></div>
        <div className="absolute bottom-20 right-20 w-28 h-20 bg-white/15 rounded-full blur-md animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 p-6">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-800 transition-colors">
          <span className="mr-2">←</span>
          Back to Home
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <span className="text-2xl">🌱</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Begin Your Journey</h1>
            <p className="text-gray-600">Join our community of healing and growth</p>
          </div>

          {/* Progress Indicator for Email Signup */}
          {loading && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-800">Setting up your account...</p>
                  <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator for Google Signup */}
          {googleSigningIn && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 border-2 border-green-400 border-t-transparent rounded-full animate-spin"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">Connecting with Google...</p>
                  <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                    <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{width: '80%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Success Message - Only show if not showing emailSent screen */}
          {success && !loading && !googleSigningIn && !emailSent && (
            <div className="mb-4 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg">✅</span>
                <span className="font-semibold">{success}</span>
              </div>
            </div>
          )}

          {/* Google Sign-in Success Message */}
          {success && !loading && googleSigningIn === false && success.includes('Welcome') && !emailSent && (
            <div className="mb-4 p-4 bg-green-100 border-2 border-green-400 text-green-700 rounded-lg">
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-lg">✅</span>
                <span className="font-semibold">{success}</span>
              </div>
              <div className="mt-3">
                <button
                  onClick={() => navigate('/chatbot')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Go to Chatbot Now
                </button>
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

          {/* Signup Form */}
          <div className="glass-card p-8 rounded-2xl shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="First name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="Last name"
                  />
                </div>
              </div>

              {/* Email Field */}
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

              {/* Password Fields */}
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
                  minLength="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Create a password (min 6 characters)"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength="6"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-healing-400 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                  className="mt-1 rounded border-gray-300 text-healing-600 focus:ring-healing-400"
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-sm text-gray-600">
                  I agree to the{' '}
                  <Link to="/terms" className="text-healing-600 hover:text-healing-700 underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-healing-600 hover:text-healing-700 underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full healing-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-200"></div>
              <span className="px-4 text-sm text-gray-500">or</span>
              <div className="flex-1 border-t border-gray-200"></div>
            </div>

            {/* Social Signup */}
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

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{' '}
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
      <div className="absolute bottom-32 left-32 w-24 h-24 bg-gradient-to-br from-lavender-200/30 to-peach-200/30 rounded-full flex items-center justify-center floating-element">
        <span className="text-2xl">✨</span>
      </div>
    </div>
  );
};

export default SignupPage;
