import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './components/HomePage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ChatbotPage from './components/ChatbotPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen nature-gradient flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-healing-400 to-nature-400 rounded-full flex items-center justify-center mb-4 animate-spin">
            <span className="text-2xl">🌿</span>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  return currentUser ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route 
        path="/chatbot" 
        element={
          <ProtectedRoute>
            <ChatbotPage />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
