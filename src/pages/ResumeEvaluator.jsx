import React, { useState } from 'react';
import { FileText, Sparkles, BarChart, Mail, CheckCircle } from 'lucide-react';

const ResumeEvaluator = () => {
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
            AI-Powered Resume Evaluator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant, personalized feedback on your resume from our advanced AI system. 
            Perfect your resume for your dream tech role.
          </p>
        </div>

        {/* Features Preview */}
        <div className="grid md:grid-cols-3 gap-8 py-12">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-6 w-6 text-yellow-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">AI Analysis</h3>
            <p className="text-gray-600">Advanced AI feedback on content, format, and impact</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Industry Benchmarking</h3>
            <p className="text-gray-600">Compare your resume against successful industry standards</p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-600">Actionable improvements for better impact</p>
          </div>
        </div>

        {/* Notification Form */}
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-gray-700 mb-4">
              Join the waitlist to be among the first to optimize your resume with AI.
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
                Join Waitlist
              </button>
            </div>
            {isSubmitted && (
              <p className="text-green-600 flex items-center justify-center gap-1">
                <CheckCircle className="h-4 w-4" />
                You're on the waitlist!
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

export default ResumeEvaluator;