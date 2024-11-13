import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

// Components
import Header from './components/Header';
import Home from './components/Home';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import JobBoard from './pages/JobBoard';
import BlogsPage from './pages/Blogs';
import BlogPage from './pages/BlogPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ResumeEvaluator from './pages/ResumeEvaluator';
import Podcasts from './pages/Podcasts';
import ResourcesPage from './pages/Resources';
import './index.css';
import ChatbotPopup from './components/Chatbot';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingSpinner />; // Create a loading component for better UX
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header will show different nav items based on auth state */}
        <Header isAuthenticated={!!user} />
        
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/job-board" element={<JobBoard />} />
            <Route path="/resume-evaluator" element={<ResumeEvaluator />} />
            <Route path="/podcasts" element={<Podcasts />} />
            
            {/* Auth routes - Redirect to blogs if already logged in */}
            <Route 
              path="/login" 
              element={
                user ? <Navigate to="/blogs" replace /> : <LoginForm />
              } 
            />
            <Route 
              path="/signup" 
              element={
                user ? <Navigate to="/blogs" replace /> : <SignupForm />
              } 
            />
            
            {/* Protected routes */}
            <Route
              path="/blogs"
              element={
                <ProtectedRoute>
                  <BlogsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <ProtectedRoute>
                  <BlogPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resources"
              element={
                <ProtectedRoute>
                  <ResourcesPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <ChatbotPopup />
      </div>
    </Router>
  );
}

export default App;