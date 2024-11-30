import React from 'react';
import { Users, Podcast, UserPlus } from 'lucide-react';

const CommunityPage = () => {
  const whatsappGroupLink = "https://chat.whatsapp.com/BZgzJBwSbb49pKIg6ebPNt";

  return (
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
  );
};

export default CommunityPage;