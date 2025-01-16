import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { Mail, Lock, User, Phone, GraduationCap, Sparkles, CalendarClock, Building } from 'lucide-react';
import { toast } from 'react-hot-toast';
import '../App.css'
import { useLocation } from 'react-router-dom';

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Email is already registered. Please use a different email or try logging in.';
    case 'auth/invalid-email':
      return 'Invalid email format. Please check your email address.';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    default:
      return 'An unexpected error occurred during signup. Please try again.';
  }
};

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    major: '',
    skills: '',
    college: '' // New field added
  });
  const [termsAgreed, setTermsAgreed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSuccessfulSignup = () => {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!termsAgreed) {
      toast.error('Please agree to the privacy policy and terms of service', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF6B6B',
          color: 'white',
        }
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      
      await setDoc(doc(firestore, "users", userCredential.user.uid), {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        major: formData.major,
        skills: formData.skills,
        college: formData.college,
        createdAt: new Date().toISOString()
      });

      toast.success('Account created successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: 'white',
        }
      });

      handleSuccessfulSignup();
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

  const handleGoogleSignIn = async () => {
    if (!termsAgreed) {
      toast.error('Please agree to the privacy policy and terms of service', {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#FF6B6B',
          color: 'white',
        }
      });
      return;
    }

    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast.success('Signed up with Google successfully!', {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#4CAF50',
          color: 'white',
        }
      });
      handleSuccessfulSignup();
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

  const inputFields = [
    { name: 'name', label: 'Full Name', type: 'text', icon: User, placeholder: 'Enter your full name' },
    { name: 'email', label: 'Email Address', type: 'email', icon: Mail, placeholder: 'Enter your email' },
    { name: 'password', label: 'Password', type: 'password', icon: Lock, placeholder: 'Create a password' },
    { name: 'phone', label: 'Phone Number', type: 'tel', icon: Phone, placeholder: 'Enter your phone number' },
    { name: 'age', label: 'Age', type: 'number', icon: CalendarClock, placeholder: 'Enter your age' },
    { name: 'major', label: 'Major', type: 'text', icon: GraduationCap, placeholder: 'Enter your major' },
    { name: 'skills', label: 'Skills', type: 'text', icon: Sparkles, placeholder: 'Enter your skills' },
    { name: 'college', label: 'College/Organization', type: 'text', icon: Building, placeholder: 'Enter your college or organization' }, // New field
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <video 
        className="fixed z-0 min-w-full min-h-full w-auto h-auto top-0 left-0 object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="loginvid.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg my-8">
        <div className="text-center">
          <Link to="/" className="inline-block mb-6">
            <img src="/logo.png" alt="Logo" className="h-12 mx-auto" />
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign in here
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6 mt-8">
          {inputFields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                {field.label}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <field.icon size={20} className="text-gray-400" />
                </div>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              </div>
            </div>
          ))}

          {/* Rest of the component remains the same */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I have read and agree to the{' '}
              <Link 
                to="/privacy-policy" 
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link 
                to="/terms-of-service" 
                className="text-blue-600 hover:text-blue-700 underline"
              >
                Terms of Service
              </Link>
            </label>
          </div>

          <button
            type="submit"
            disabled={!termsAgreed}
            className={`w-full flex items-center justify-center gap-2 text-white py-2 px-6 rounded-full transition duration-300 ${
              termsAgreed 
                ? 'bg-black hover:bg-gray-800' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            <User size={20} />
            Create Account
          </button>
          <button 
            onClick={handleGoogleSignIn}
            disabled={!termsAgreed}
            className={`w-full flex items-center justify-center gap-2 py-2 px-6 rounded-full ${
              termsAgreed 
                ? 'google-signin-btn' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className="fa-brands fa-google" aria-hidden="true"></i> Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;