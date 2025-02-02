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
import JobDetailsModal from './components/JobDetailsModal';  // Add this import
import BlogsPage from './pages/Blogs';
import BlogPage from './pages/BlogPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ResumeEvaluator from './pages/ResumeEvaluator';
import Podcasts from './pages/Podcasts';
import CommunityPage from './pages/Resources';
import './index.css';
import ChatbotPopup from './components/Chatbot';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AboutUs from './pages/AboutUs';

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
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Toaster />
        <Header isAuthenticated={!!user} />
        
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<JobBoard />}>
              <Route path=":id" element={<JobDetailsModal />} />
            </Route>
            <Route path="/about" element={<AboutUs />} />
            <Route path="/resume-evaluator" element={<ResumeEvaluator />} />
            <Route path="/podcasts" element={<Podcasts />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            
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
              path="/communityPage"
              element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              }
            />

            {/* Catch all route - 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <ChatbotPopup />
      </div>
      <Footer/>
    </Router>
  );
}

export default App;