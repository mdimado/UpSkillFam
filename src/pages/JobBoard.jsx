import React, { useState } from 'react';
import { Mail, Bell, CheckCircle } from 'lucide-react';

const JobBoard = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the email subscription
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    
    // Reset the submission state after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Job Board Coming Soon
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We're building a better way to connect talented individuals with exciting career opportunities.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Job Alerts</h3>
            <p className="text-gray-600">Get notified about new opportunities matching your preferences</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Verified Listings</h3>
            <p className="text-gray-600">All job postings are verified and from trusted companies</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Easy Apply</h3>
            <p className="text-gray-600">One-click applications with your saved profile</p>
          </div>
        </div>

        {/* Notification Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-700 mb-4">
              Be the first to know when we launch. Get early access to job postings.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 p-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Notify Me
              </button>
            </div>
            {isSubmitted && (
              <p className="text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                We'll notify you when we launch!
              </p>
            )}
          </form>
        </div>

        {/* Launch Timeline */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            Expected launch: December 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobBoard;