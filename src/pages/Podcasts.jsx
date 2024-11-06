import React, { useState } from 'react';
import { Mic, Headphones, Users, Mail, CheckCircle } from 'lucide-react';

const Podcasts = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    setIsSubmitted(true);
    setEmail('');
    
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
             Career Podcasts
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Listen to inspiring stories and expert advice from tech industry leaders.
            Real conversations about career growth, technology, and success.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mic className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Expert Interviews</h3>
            <p className="text-gray-600">Weekly conversations with industry leaders</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Stories</h3>
            <p className="text-gray-600">Real experiences from successful tech professionals</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Career Insights</h3>
            <p className="text-gray-600">Actionable advice for career growth</p>
          </div>
        </div>

        {/* Preview of Upcoming Episodes */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-3xl font-semibold mb-4">Coming Soon</h3>
          
        </div>

        {/* Notification Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-700 mb-4">
              Subscribe to get notified when we launch our first episode.
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
                Subscribe
              </button>
            </div>
            {isSubmitted && (
              <p className="text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                You're subscribed!
              </p>
            )}
          </form>
        </div>

        {/* Launch Timeline */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-600">
            First episode launching: December 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default Podcasts;