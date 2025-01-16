import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { Mail, Lock, LogIn } from 'lucide-react';
import { toast } from 'react-hot-toast';
import '../App.css'
import { useLocation } from 'react-router-dom';

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/invalid-credential':
      return 'Incorrect email or password. Please try again.';
    case 'auth/user-not-found':
      return 'No account found with this email. Please sign up.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/too-many-requests':
      return 'Too many login attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/invalid-email':
      return 'Invalid email format. Please check your email.';
    default:
      return 'An unexpected error occurred. Please try again.';
  }
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Add this

  const handleSuccessfulLogin = () => {
    const { state } = location;
    if (state?.jobId) {
      navigate(`/jobs/${state.jobId}`);
      if (state.returnUrl) {
        window.open(state.returnUrl, '_blank');
      }
    } else {
      navigate('/blogs');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Welcome back!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: 'white',
        }
      });
      handleSuccessfulLogin();
    } catch (error) {
      const friendlyMessage = getErrorMessage(error.code);
      toast.error(friendlyMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF6B6B',
          color: 'white',
        }
      });
      setError(friendlyMessage);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Welcome back!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: 'white',
        }
      });
      handleSuccessfulLogin();
    } catch (error) {
      const friendlyMessage = getErrorMessage(error.code);
      toast.error(friendlyMessage, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF6B6B',
          color: 'white',
        }
      });
    }
  };

  return (
    <div className="max-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <video 
        className="fixed z-0 min-w-full min-h-full w-auto h-auto top-0 left-0 object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="loginvid.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg">
        
        <div className="text-center">
          
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.png" alt="Logo" className="h-12 mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up here
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 mt-8">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
          >
            <LogIn size={20} />
            Sign In
          </button>
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full flex items-center justify-center gap-2 py-2 px-6 rounded-full google-signin-btn"
          >
            <i className="fa-brands fa-google" aria-hidden="true"></i> Sign in with Google
          </button>
        </form>
        
      </div>
      
    </div>
  );
};

export default LoginForm;