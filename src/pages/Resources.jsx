import React from 'react';
import { Users, Podcast, UserPlus, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CommunityPage = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/BZgzJBwSbb49pKIg6ebPNt";

  return (
    <div>
      {/* New Banner Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 mb-8"
      >
        <div className="container mx-auto px-4 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32" />
            <div className="absolute left-0 bottom-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24" />
          </div>
          
          <a href="/about" className="block">
            <div className="py-6 flex items-center justify-between hover:opacity-90 transition-opacity relative z-10">
              <div className="flex items-center space-x-6">
                <div className="h-16 w-1 bg-white rounded-full"></div>
                <div>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-purple-100 font-medium"
                  >
                    New to our community?
                  </motion.p>
                  <motion.p 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold text-white mt-1"
                  >
                    Meet the team behind this initiative
                  </motion.p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="hidden md:flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full text-white"
              >
                <span>Learn more</span>
                <ArrowRight size={20} />
              </motion.div>
            </div>
          </a>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Join Our Community</h1>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <Users size={64} className="mx-auto mb-6 text-blue-600" />
        
        <h2 className="text-2xl font-semibold mb-4">Connect with 1000+ Learners Just Like You!</h2>
        
        <p className="text-gray-600 mb-6">
          Join our WhatsApp community to network, share insights, and grow together. 
          Get access to exclusive resources, mentorship opportunities, and real-time support.
        </p>
        
        <a 
          href={whatsappGroupLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center bg-green-500 text-white py-3 px-6 rounded-full hover:bg-green-600 transition duration-300 text-lg"
        >
          <Users size={24} className="mr-2" />
          Join WhatsApp Group
        </a>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
        {/* Upcoming Podcasts Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <Podcast size={48} className="text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Upcoming Podcasts</h3>
          <p className="text-gray-600">
            Stay tuned for our upcoming podcasts. We'll announce details about guest speakers, 
            topics, and broadcast dates right here.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            No upcoming podcasts at the moment. Check back soon!
          </div>
        </div>

        {/* Mentor Onboarding Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <UserPlus size={48} className="text-blue-600 mb-4" />
          <h3 className="text-2xl font-semibold mb-4">Mentor Onboarding</h3>
          <p className="text-gray-600">
            Interested in becoming a mentor or learning about our mentorship programs? 
            We'll share updates and opportunities here.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Mentor applications will be opening soon. Stay connected!
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default CommunityPage;