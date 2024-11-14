import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, firestore } from '../firebase';
import { Mail, Lock, User, Phone, GraduationCap, Sparkles, CalendarClock } from 'lucide-react';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    major: '',
    skills: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
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
        createdAt: new Date().toISOString()
      });

      navigate('/blogs');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      alert("Logged in with Google successfully!");
      navigate('/'); 
    } catch (error) {
      alert(error.message);
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
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <video className="background-video" autoPlay loop muted>
        <source src="/loginvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg my-8">
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

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm">
            {error}
          </div>
        )}

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

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-6 rounded-full hover:bg-gray-800 transition duration-300"
          >
            <User size={20} />
            Create Account
          </button>
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full flex items-center justify-center gap-2 py-2 px-6 rounded-full google-signin-btn"
          >
            <i className="fa-brands fa-google" aria-hidden="true"></i> Sign Up with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;